import { tailwindFeature } from "./tailwind/index";
import { scssFeature } from './scss/index';
import { huskyFeature } from './husky/index';
import { svgrFeature } from './svgr/index';

export const featureRegistry = {
    tailwind: tailwindFeature,
    scss: scssFeature,
    husky: huskyFeature,
    svgr: svgrFeature,
};