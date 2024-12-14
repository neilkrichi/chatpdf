
import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import "pdf-parse"; // Peer dep

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
});

export async function loadS3IntoPinecone(fileKey: string) {
    // 1. obtain the pdf -> download and read from pdf
    console.log('downloading s3 into file system');
    const file_name = await downloadFromS3(fileKey);

    if (!file_name) {
        throw new Error('Could not download from S3');
    }

    const loader = new PDFLoader(file_name);
    const pages = await loader.load();
    console.log(pages);
    return pages;
}