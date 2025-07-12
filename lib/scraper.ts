import { chromium, Browser, Page } from 'playwright';
import { v4 as uuidv4 } from 'uuid';
import { ScrapingResult } from './types';
import { RLRewardSystem } from './rl-reward-system';
import path from 'path';
import fs from 'fs/promises';

export class WebScraper {
  private browser: Browser | null = null;
  private rlSystem: RLRewardSystem;
  private screenshotDir: string;

  constructor() {
    this.rlSystem = new RLRewardSystem();
    this.screenshotDir = path.join(process.cwd(), 'public/screenshots');
    this.ensureScreenshotDir();
  }

  private async ensureScreenshotDir(): Promise<void> {
    try {
      await fs.mkdir(this.screenshotDir, { recursive: true });
    } catch (error) {
      console.error('Error creating screenshot directory:', error);
    }
  }

  async initialize(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async scrapeChapter(url: string): Promise<ScrapingResult> {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser!.newPage();
    
    try {
      // Set user agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Wait for content to load
      await page.waitForTimeout(2000);
      
      // Extract content using multiple strategies
      const content = await this.extractContent(page);
      const title = await this.extractTitle(page);
      const screenshots = await this.takeScreenshots(page, title);
      
      // Calculate reward based on content quality
      const reward = this.calculateContentReward(content, title);
      
      // Store RL reward
      await this.rlSystem.storeReward({
        id: uuidv4(),
        chapterId: uuidv4(),
        action: 'scrape_content',
        reward,
        state: { url, contentLength: content.length },
        nextState: { scraped: true, quality: reward },
        timestamp: new Date()
      });

      return {
        url,
        title,
        content,
        screenshots,
        metadata: {
          wordCount: content.split(' ').length,
          characterCount: content.length,
          paragraphs: content.split('\n\n').length,
          scrapedAt: new Date().toISOString()
        },
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error scraping chapter:', error);
      throw error;
    } finally {
      await page.close();
    }
  }

  private async extractContent(page: Page): Promise<string> {
    // Try multiple selectors to find content
    const contentSelectors = [
      '.mw-parser-output', // Wikisource specific
      'article',
      '.content',
      '#content',
      'main',
      '.post-content',
      '.entry-content',
      '.article-content'
    ];

    for (const selector of contentSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const content = await element.textContent();
          if (content && content.trim().length > 100) {
            return content.trim();
          }
        }
      } catch (error) {
        console.warn(`Failed to extract content with selector ${selector}:`, error);
      }
    }

    // Fallback to body content
    const bodyContent = await page.textContent('body');
    return bodyContent?.trim() || '';
  }

  private async extractTitle(page: Page): Promise<string> {
    // Try multiple selectors for title
    const titleSelectors = [
      'h1',
      '.title',
      '.page-title',
      '#title',
      'title'
    ];

    for (const selector of titleSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const title = await element.textContent();
          if (title && title.trim().length > 0) {
            return title.trim();
          }
        }
      } catch (error) {
        console.warn(`Failed to extract title with selector ${selector}:`, error);
      }
    }

    return 'Untitled Chapter';
  }

  private async takeScreenshots(page: Page, title: string): Promise<string[]> {
    const screenshots: string[] = [];
    const timestamp = Date.now();
    
    try {
      // Full page screenshot
      const fullScreenshotPath = path.join(this.screenshotDir, `${timestamp}_${title.replace(/[^a-zA-Z0-9]/g, '_')}_full.png`);
      await page.screenshot({ 
        path: fullScreenshotPath, 
        fullPage: true,
        type: 'png'
      });
      screenshots.push(`/screenshots/${path.basename(fullScreenshotPath)}`);

      // Viewport screenshot
      const viewportScreenshotPath = path.join(this.screenshotDir, `${timestamp}_${title.replace(/[^a-zA-Z0-9]/g, '_')}_viewport.png`);
      await page.screenshot({ 
        path: viewportScreenshotPath,
        type: 'png'
      });
      screenshots.push(`/screenshots/${path.basename(viewportScreenshotPath)}`);

    } catch (error) {
      console.error('Error taking screenshots:', error);
    }

    return screenshots;
  }

  private calculateContentReward(content: string, title: string): number {
    let reward = 0;
    
    // Base reward for successful extraction
    reward += 10;
    
    // Content length reward
    const wordCount = content.split(' ').length;
    if (wordCount > 100) reward += 20;
    if (wordCount > 500) reward += 30;
    if (wordCount > 1000) reward += 40;
    
    // Title quality reward
    if (title && title !== 'Untitled Chapter') reward += 15;
    
    // Content structure reward
    const paragraphs = content.split('\n\n').length;
    if (paragraphs > 3) reward += 10;
    
    // Penalize very short or very long content
    if (wordCount < 50) reward -= 30;
    if (wordCount > 5000) reward -= 10;
    
    return Math.max(0, reward);
  }

  async scrapeMultipleChapters(baseUrl: string, chapterCount: number): Promise<ScrapingResult[]> {
    const results: ScrapingResult[] = [];
    
    for (let i = 1; i <= chapterCount; i++) {
      try {
        const chapterUrl = `${baseUrl.replace('/Chapter_1', `/Chapter_${i}`)}`;
        const result = await this.scrapeChapter(chapterUrl);
        results.push(result);
        
        // Delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error scraping chapter ${i}:`, error);
      }
    }
    
    return results;
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export default WebScraper;