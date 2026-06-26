import { PackageJsonBuilder } from '../core/package-json/package-json-builder';
import { ProjectConfig } from './project';

export interface FeatureContext {
    projectPath: string;
    config: ProjectConfig;

    packageJsonBuilder:
    PackageJsonBuilder;
}

export interface FeatureModule {
    name: string;

    dependencies?: string[];

    devDependencies?: string[];

    apply(
        context: FeatureContext
    ): Promise<void>;

    postInstall?(
        context: FeatureContext
    ): Promise<void>;
}