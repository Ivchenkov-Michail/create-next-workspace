import path from 'node:path';

export function getTemplatesRoot(): string {
    return path.join(__dirname, 'templates');
}
