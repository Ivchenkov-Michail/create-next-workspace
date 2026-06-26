import fs from 'fs-extra';

export async function ensureFile(
    path: string,
    content: string
) {
    await fs.outputFile(path, content);
}