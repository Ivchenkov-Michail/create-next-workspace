import path from 'node:path';

import fs from 'fs-extra';

export async function writeNextConfig(
    projectPath: string,
    content: string
) {
    const configPath = path.join(
        projectPath,
        'next.config.ts'
    );

    await fs.writeFile(configPath, content);
}