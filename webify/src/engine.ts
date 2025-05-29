// This is the main entry point for the blog engine.
// It is responsible for reading all the posts and pages
// from disk, and generate the required JSON and markdown files.
// It also generates the RSS feed and the sitemap.

import fs from 'fs';
import path from 'path';
import * as fsExtra from 'fs-extra';
import { readConfig } from './config.js';
import { readFiles } from './utils.js';
import { processFile } from './process.js';
import { Site } from './types.js';

/**
 * The main function responsible to generate the blog.
 */
export async function generateBlog(configFile: string): Promise<void> {
    console.log('Config file: ', configFile);

    const root = path.dirname(configFile);
    console.log('  Root: ', root);

    // read config file
    console.log('');
    const config = readConfig(configFile);
    console.log('Config file read as: ', JSON.stringify(config, null, 2));

    // read all files from the source directory
    const allFiles: string[] = readFiles(root, config?.build?.include, config?.build?.exclude);

    // log all files
    allFiles.forEach(file => {
        console.log('  Found file: ', file);
    });

    // create a dist folder
    const distFolder = path.join(root, 'dist');
    console.log('Dist folder: ', distFolder);

    if (!fs.existsSync(distFolder)) {
        console.log('  creating...');
        fs.mkdirSync(distFolder);
    } else {
        // clean up
        console.log('  cleaning...');
        fsExtra.emptyDirSync(distFolder);
    }

    // create the uber site metadata site.json file
    const site: Site = {
        ...config,
        pages: []
    };

    for (let index = 0; index < allFiles.length; index++) {
        const file = allFiles[index];

        const filePath: string = path.join(root, file);
        if (filePath.includes('/.')) {
            continue;
        }

        if (filePath.startsWith(path.join(root, 'dist'))) {
            continue;
        }

        const meta = await processFile(root, distFolder, filePath, config);
        if (meta) {
            site.pages.push(meta);
        }
    }

    // write the site object to dest
    console.log('Writing site.json ...');
    const siteFile = path.join(distFolder, 'site.json');
    fs.writeFileSync(siteFile, JSON.stringify(site, null, 2));
}

