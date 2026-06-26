import { featureRegistry } from '../features/index';
import { ProjectConfig } from '../types/project';
import { FeatureModule } from '../types/feature';

export function resolveFeatures(
    config: ProjectConfig
): FeatureModule[] {
    const features: FeatureModule[] = [];

    if (config.features.tailwind) {
        features.push(featureRegistry.tailwind);
    }

    if (config.features.scss) {
        features.push(featureRegistry.scss);
    }

    if (config.features.husky) {
        features.push(featureRegistry.husky);
    }

    if (config.features.svgr) {
        features.push(featureRegistry.svgr);
    }

    return features;
}