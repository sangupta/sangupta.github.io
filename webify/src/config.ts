import fs from 'fs';
import path from 'path';
import { ConfigFile } from './types';

/**
 * The name of the configuration file to look for.
 */
const CONFIG_FILE_NAME: string = "webify.json";

/**
 * Find the actual path of the configuration file
 * based on the CLI arguments or using default filename
 * in current folder.
 * 
 * @returns 
 */
export function resolveConfig(args: string[]): string {
    const configFile = args[0];

    let config;
    if (configFile) {
        const stats = fs.statSync(configFile);
        if (stats.isDirectory()) {
            config = path.join(configFile, CONFIG_FILE_NAME);
        } else {
            config = configFile;
        }
    } else {
        console.log('No config file provided, using default: ', CONFIG_FILE_NAME);
        config = CONFIG_FILE_NAME;
    }

    return path.resolve(config);
}

/**
 * Read and parse the configuration file.
 * 
 * @param configFile 
 * @returns 
 */
export function readConfig(configFile: string): ConfigFile {
    const configExists = fs.existsSync(configFile);
    if (!configExists) {
        console.warn('No config file found, exiting!\n');
        process.exit(0);
    }

    return JSON.parse(fs.readFileSync(configFile, 'utf8'));
}
