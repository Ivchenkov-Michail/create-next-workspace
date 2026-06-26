import fs from 'fs-extra';

export async function replaceFileContent(
    path: string,
    content: string
) {
    await fs.writeFile(path, content);
}