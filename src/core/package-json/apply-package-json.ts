import fs from 'fs-extra';

import path from 'node:path';

import { PackageJsonBuilder }
    from './package-json-builder';
import { parseDependencySpec }
    from './parse-dependency-spec';

export async function applyPackageJson(
    projectPath: string,
    builder: PackageJsonBuilder
) {
    const packageJsonPath =
        path.join(
            projectPath,
            'package.json'
        );

    const packageJson =
        await fs.readJson(
            packageJsonPath
        );

    const data = builder.getData();

    packageJson.scripts ??= {};

    packageJson.devDependencies ??=
        {};

    Object.assign(
        packageJson.scripts,
        data.scripts
    );

    for (
        const dependency
        of data.devDependencies
    ) {
        const { name, version } =
            parseDependencySpec(dependency);

        packageJson.devDependencies[name] =
            version;
    }

    await fs.writeJson(
        packageJsonPath,
        packageJson,
        {
            spaces: 2,
        }
    );
}