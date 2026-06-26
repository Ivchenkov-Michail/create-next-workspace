import path from 'node:path';

import fs from 'fs-extra';

export async function renameSpecialFiles(
    projectPath: string
) {
    const files = [
        {
            from: 'gitignore',
            to: '.gitignore',
        },
    ];

    for (const file of files) {
        const fromPath = path.join(
            projectPath,
            file.from
        );

        const toPath = path.join(
            projectPath,
            file.to
        );

        const exists =
            await fs.pathExists(
                fromPath
            );

        if (exists) {
            await fs.move(
                fromPath,
                toPath
            );
        }
    }
}