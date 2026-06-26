import os from 'node:os';

import { PackageManager } from '../../types/package-manager';

export function getPackageManagerCommand(
    packageManager: PackageManager
) {
    const isWindows =
        os.platform() === 'win32';

    switch (packageManager) {
        case 'pnpm':
            return isWindows
                ? 'pnpm.cmd'
                : 'pnpm';

        case 'yarn':
            return isWindows
                ? 'yarn.cmd'
                : 'yarn';

        case 'bun':
            return 'bun';

        default:
            return isWindows
                ? 'npm.cmd'
                : 'npm';
    }
}