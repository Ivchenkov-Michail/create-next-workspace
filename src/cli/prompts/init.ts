import path from 'node:path';

import fs from 'fs-extra';

import * as p from '@clack/prompts';

import { ProjectConfig } from '../../types/project';
import { PackageManager } from '../../types/package-manager';

export interface PartialPromptOptions {
    projectName?: string;
    packageManager?: PackageManager;
    tailwind?: boolean;
    scss?: boolean;
    husky?: boolean;
    svgr?: boolean;
}

function isValidProjectName(name: string): boolean {
    const normalized = name.trim();

    if (!normalized) {
        return false;
    }

    return /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i.test(
        normalized
    );
}

async function isTargetDirectoryAvailable(
    name: string
): Promise<boolean> {
    const targetPath = path.resolve(name);

    if (!(await fs.pathExists(targetPath))) {
        return true;
    }

    const entries = await fs.readdir(targetPath);

    return entries.length === 0;
}

function handleCancel<T>(value: T | symbol): T {
    if (p.isCancel(value)) {
        p.cancel('Operation cancelled.');
        process.exit(0);
    }

    return value as T;
}

function isValidPackageManager(
    value: string
): value is PackageManager {
    return (
        value === 'npm' ||
        value === 'pnpm' ||
        value === 'yarn' ||
        value === 'bun'
    );
}

async function resolveProjectName(
    partial?: PartialPromptOptions
): Promise<string> {
    if (partial?.projectName) {
        const validationError =
            await validateProjectName(
                partial.projectName
            );

        if (validationError) {
            throw new Error(validationError);
        }

        return partial.projectName;
    }

    const projectName = handleCancel(
        await p.text({
            message: 'Project name:',
            placeholder: 'my-app',
            validate(value) {
                if (!value) {
                    return 'Project name is required';
                }

                if (!isValidProjectName(value)) {
                    return 'Invalid project name';
                }
            },
        })
    );

    const resolvedName = String(projectName);

    if (
        !(await isTargetDirectoryAvailable(
            resolvedName
        ))
    ) {
        p.cancel(
            `Directory "${path.resolve(resolvedName)}" already exists and is not empty.`
        );
        process.exit(1);
    }

    return resolvedName;
}

async function resolvePackageManager(
    partial?: PartialPromptOptions
): Promise<PackageManager> {
    if (partial?.packageManager !== undefined) {
        if (
            !isValidPackageManager(
                partial.packageManager
            )
        ) {
            throw new Error(
                'Package manager must be npm, pnpm, yarn, or bun'
            );
        }

        return partial.packageManager;
    }

    const packageManager = handleCancel(
        await p.select({
            message: 'Choose package manager',
            options: [
                { value: 'npm', label: 'npm' },
                { value: 'pnpm', label: 'pnpm' },
                { value: 'yarn', label: 'yarn' },
                { value: 'bun', label: 'bun' },
            ],
        })
    );

    return packageManager as PackageManager;
}

async function resolveFeatureFlag(
    partial: PartialPromptOptions | undefined,
    key: keyof Pick<
        PartialPromptOptions,
        'tailwind' | 'scss' | 'husky' | 'svgr'
    >,
    message: string
): Promise<boolean> {
    if (partial?.[key] !== undefined) {
        return partial[key]!;
    }

    return Boolean(
        handleCancel(
            await p.confirm({
                message,
                initialValue: true,
            })
        )
    );
}

export async function initPrompts(
    partial?: PartialPromptOptions
): Promise<ProjectConfig> {
    const projectName =
        await resolveProjectName(partial);

    const packageManager =
        await resolvePackageManager(partial);

    const tailwind = await resolveFeatureFlag(
        partial,
        'tailwind',
        'Use Tailwind CSS?'
    );

    const scss = await resolveFeatureFlag(
        partial,
        'scss',
        'Use SCSS modules?'
    );

    const husky = await resolveFeatureFlag(
        partial,
        'husky',
        'Setup Husky + lint-staged?'
    );

    const svgr = await resolveFeatureFlag(
        partial,
        'svgr',
        'Setup SVGR?'
    );

    return {
        projectName,
        packageManager,
        features: {
            tailwind,
            scss,
            husky,
            svgr,
        },
    };
}

export async function validateProjectName(
    name: string
): Promise<string | undefined> {
    if (!name) {
        return 'Project name is required';
    }

    if (!isValidProjectName(name)) {
        return 'Invalid project name';
    }

    if (!(await isTargetDirectoryAvailable(name))) {
        return `Directory "${path.resolve(name)}" already exists and is not empty`;
    }

    return undefined;
}

export { isValidProjectName, isTargetDirectoryAvailable };
