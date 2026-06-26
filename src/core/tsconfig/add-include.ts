import path from 'node:path';

import fs from 'fs-extra';

export async function addTsConfigInclude(
    projectPath: string,
    value: string
) {
    const tsconfigPath = path.join(
        projectPath,
        'tsconfig.json'
    );

    const tsconfig = await fs.readJson(
        tsconfigPath
    );

    tsconfig.include ??= [];

    if (!tsconfig.include.includes(value)) {
        tsconfig.include.unshift(value);
    }

    await fs.writeJson(
        tsconfigPath,
        tsconfig,
        {
            spaces: 2,
        }
    );
}