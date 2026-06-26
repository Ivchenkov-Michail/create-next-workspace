import { execa } from 'execa';

import { PackageManager }
    from '../types/package-manager';

import { getPackageManagerCommand }
    from './package-manager';

export async function installProjectDependencies(
    projectPath: string,
    packageManager: PackageManager
) {
    const command =
        getPackageManagerCommand(
            packageManager
        );

    await execa(
        command,
        ['install'],
        {
            cwd: projectPath,
            stdio: process.stdout.isTTY
                ? 'inherit'
                : 'pipe',
        }
    );
}