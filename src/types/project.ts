import { PackageManager } from "./package-manager";

export interface ProjectConfig {
    projectName: string;
    packageManager: PackageManager;

    features: {
        tailwind: boolean;
        scss: boolean;
        husky: boolean;
        svgr: boolean;
    };
}