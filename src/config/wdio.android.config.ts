import { config as baseConfig } from './wdio.conf.js';
import path from 'node:path';
// Appium capabilities
baseConfig.capabilities = [
    {
        'appium:platformName': 'Android',
        'appium:automationName': 'uiautomator2'
    }
];

export const config = baseConfig;
