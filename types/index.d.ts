declare module 'wink-embeddings-sg-100d' {
    // turn off exporting by default since we don't want to expose internal details
    export {};
 
    interface WordEmbedding { 
        precision: number;
        l2NormIndex: number; 
        wordIndex: number; 
        dimensions: number; 
        unkVector: number[];
        size: number; 
        words: string[]; 
        vectors: Record<string, number[]>;
    }
 
    const wordEmbeddings: WordEmbedding;
    export default wordEmbeddings;
 }