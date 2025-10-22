import { ChromaClient, Collection } from 'chromadb';
import { BookContent, Chapter, AISpinRecord } from './types';
import { v4 as uuidv4 } from 'uuid';

export class ChromaDBManager {
  private client: ChromaClient;
  private bookCollection: Collection | null = null;
  private chapterCollection: Collection | null = null;
  private versionCollection: Collection | null = null;

  constructor() {
    this.client = new ChromaClient({
      path: process.env.CHROMA_HOST || 'http://localhost:8000'
    });
  }

  async initialize(): Promise<void> {
    try {
      // Create collections for different content types
      this.bookCollection = await this.client.getOrCreateCollection({
        name: 'books',
        metadata: { description: 'Book metadata and content' }
      });

      this.chapterCollection = await this.client.getOrCreateCollection({
        name: 'chapters',
        metadata: { description: 'Chapter content and versions' }
      });

      this.versionCollection = await this.client.getOrCreateCollection({
        name: 'versions',
        metadata: { description: 'Version history and AI spin records' }
      });
    } catch (error) {
      console.error('Error initializing ChromaDB:', error);
      throw error;
    }
  }

  async storeBook(book: BookContent): Promise<void> {
    if (!this.bookCollection) {
      await this.initialize();
    }

    const bookText = `${book.title} ${book.metadata.description} ${book.metadata.genre}`;
    
    await this.bookCollection!.add({
      ids: [book.id],
      documents: [bookText],
      metadatas: [{
        title: book.title,
        author: book.metadata.author,
        genre: book.metadata.genre,
        language: book.metadata.language,
        chapterCount: book.chapters.length,
        createdAt: book.createdAt.toISOString(),
        sourceUrl: book.metadata.sourceUrl
      }]
    });

    // Store individual chapters
    for (const chapter of book.chapters) {
      await this.storeChapter(chapter, book.id);
    }
  }

  async storeChapter(chapter: Chapter, bookId: string): Promise<void> {
    if (!this.chapterCollection) {
      await this.initialize();
    }

    await this.chapterCollection!.add({
      ids: [chapter.id],
      documents: [chapter.content],
      metadatas: [{
        title: chapter.title,
        bookId: bookId,
        version: chapter.version,
        status: chapter.status,
        rewardScore: chapter.rewardScore,
        wordCount: chapter.content.split(' ').length,
        createdAt: chapter.createdAt.toISOString(),
        updatedAt: chapter.updatedAt.toISOString()
      }]
    });

    // Store AI spin history
    for (const spinRecord of chapter.aiSpinHistory) {
      await this.storeAISpinRecord(spinRecord, chapter.id);
    }
  }

  async storeAISpinRecord(record: AISpinRecord, chapterId: string): Promise<void> {
    if (!this.versionCollection) {
      await this.initialize();
    }

    await this.versionCollection!.add({
      ids: [record.id],
      documents: [record.response],
      metadatas: [{
        chapterId: chapterId,
        agentType: record.agentType,
        model: record.model,
        rewardScore: record.rewardScore,
        timestamp: record.timestamp.toISOString(),
        processingTime: record.metadata.processingTime || 0,
        originalLength: record.metadata.originalLength || 0,
        newLength: record.metadata.newLength || 0
      }]
    });
  }

  async searchSimilarContent(query: string, limit: number = 10): Promise<{
    books: any[];
    chapters: any[];
    versions: any[];
  }> {
    if (!this.bookCollection || !this.chapterCollection || !this.versionCollection) {
      await this.initialize();
    }

    const [bookResults, chapterResults, versionResults] = await Promise.all([
      this.bookCollection!.query({
        queryTexts: [query],
        nResults: limit
      }),
      this.chapterCollection!.query({
        queryTexts: [query],
        nResults: limit
      }),
      this.versionCollection!.query({
        queryTexts: [query],
        nResults: limit
      })
    ]);

    return {
      books: bookResults.documents[0]?.map((doc, index) => ({
        id: bookResults.ids[0]?.[index],
        content: doc,
        metadata: bookResults.metadatas[0]?.[index],
        distance: bookResults.distances?.[0]?.[index]
      })) || [],
      chapters: chapterResults.documents[0]?.map((doc, index) => ({
        id: chapterResults.ids[0]?.[index],
        content: doc,
        metadata: chapterResults.metadatas[0]?.[index],
        distance: chapterResults.distances?.[0]?.[index]
      })) || [],
      versions: versionResults.documents[0]?.map((doc, index) => ({
        id: versionResults.ids[0]?.[index],
        content: doc,
        metadata: versionResults.metadatas[0]?.[index],
        distance: versionResults.distances?.[0]?.[index]
      })) || []
    };
  }

  async getChapterVersions(chapterId: string): Promise<any[]> {
    if (!this.versionCollection) {
      await this.initialize();
    }

    const results = await this.versionCollection!.get({
      where: { chapterId: chapterId }
    });

    return results.documents?.map((doc, index) => ({
      id: results.ids?.[index],
      content: doc,
      metadata: results.metadatas?.[index]
    })) || [];
  }

  async findSimilarChapters(chapterId: string, limit: number = 5): Promise<any[]> {
    if (!this.chapterCollection) {
      await this.initialize();
    }

    // Get the target chapter
    const targetChapter = await this.chapterCollection!.get({
      ids: [chapterId]
    });

    if (!targetChapter.documents || targetChapter.documents.length === 0) {
      return [];
    }

    // Find similar chapters
    const results = await this.chapterCollection!.query({
      queryTexts: [targetChapter.documents[0]],
      nResults: limit + 1 // +1 to exclude the target chapter itself
    });

    // Filter out the target chapter and return similar ones
    return results.documents[0]?.map((doc, index) => ({
      id: results.ids[0]?.[index],
      content: doc,
      metadata: results.metadatas[0]?.[index],
      distance: results.distances?.[0]?.[index]
    })).filter(item => item.id !== chapterId) || [];
  }

  async updateChapterContent(chapterId: string, newContent: string, metadata: any): Promise<void> {
    if (!this.chapterCollection) {
      await this.initialize();
    }

    await this.chapterCollection!.update({
      ids: [chapterId],
      documents: [newContent],
      metadatas: [metadata]
    });
  }

  async deleteChapter(chapterId: string): Promise<void> {
    if (!this.chapterCollection) {
      await this.initialize();
    }

    await this.chapterCollection!.delete({
      ids: [chapterId]
    });

    // Also delete related versions
    if (this.versionCollection) {
      await this.versionCollection!.delete({
        where: { chapterId: chapterId }
      });
    }
  }

  async getContentStatistics(): Promise<{
    totalBooks: number;
    totalChapters: number;
    totalVersions: number;
    averageRewardScore: number;
  }> {
    if (!this.bookCollection || !this.chapterCollection || !this.versionCollection) {
      await this.initialize();
    }

    const [bookCount, chapterCount, versionCount] = await Promise.all([
      this.bookCollection!.count(),
      this.chapterCollection!.count(),
      this.versionCollection!.count()
    ]);

    // Calculate average reward score
    const chapterResults = await this.chapterCollection!.get({});
    const rewardScores = chapterResults.metadatas?.map(meta => meta?.rewardScore || 0) || [];
    const averageRewardScore = rewardScores.length > 0 
      ? rewardScores.reduce((sum, score) => sum + score, 0) / rewardScores.length 
      : 0;

    return {
      totalBooks: bookCount,
      totalChapters: chapterCount,
      totalVersions: versionCount,
      averageRewardScore
    };
  }

  async semanticSearch(query: string, filters?: Record<string, any>, limit: number = 20): Promise<{
    chapters: any[];
    relevanceScore: number;
  }> {
    if (!this.chapterCollection) {
      await this.initialize();
    }

    const whereClause = filters ? { ...filters } : undefined;

    const results = await this.chapterCollection!.query({
      queryTexts: [query],
      nResults: limit,
      where: whereClause
    });

    const chapters = results.documents[0]?.map((doc, index) => ({
      id: results.ids[0]?.[index],
      content: doc,
      metadata: results.metadatas[0]?.[index],
      distance: results.distances?.[0]?.[index]
    })) || [];

    // Calculate relevance score based on average distance
    const relevanceScore = chapters.length > 0
      ? chapters.reduce((sum, chapter) => sum + (1 - (chapter.distance || 0)), 0) / chapters.length
      : 0;

    return {
      chapters,
      relevanceScore
    };
  }

  async exportData(): Promise<{
    books: any[];
    chapters: any[];
    versions: any[];
  }> {
    if (!this.bookCollection || !this.chapterCollection || !this.versionCollection) {
      await this.initialize();
    }

    const [books, chapters, versions] = await Promise.all([
      this.bookCollection!.get({}),
      this.chapterCollection!.get({}),
      this.versionCollection!.get({})
    ]);

    return {
      books: books.documents?.map((doc, index) => ({
        id: books.ids?.[index],
        content: doc,
        metadata: books.metadatas?.[index]
      })) || [],
      chapters: chapters.documents?.map((doc, index) => ({
        id: chapters.ids?.[index],
        content: doc,
        metadata: chapters.metadatas?.[index]
      })) || [],
      versions: versions.documents?.map((doc, index) => ({
        id: versions.ids?.[index],
        content: doc,
        metadata: versions.metadatas?.[index]
      })) || []
    };
  }

  async close(): Promise<void> {
    // ChromaDB client doesn't require explicit closing
    console.log('ChromaDB connection closed');
  }
}

export default ChromaDBManager;