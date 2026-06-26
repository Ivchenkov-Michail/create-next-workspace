import path from 'node:path';

import fs from 'fs-extra';

import { getTemplatesRoot }
    from './get-templates-root';

export async function copyTemplate(
    templatePath: string,
    destinationPath: string
) {
    const source = path.join(
        getTemplatesRoot(),
        templatePath
    );

    await fs.copy(source, destinationPath);
}