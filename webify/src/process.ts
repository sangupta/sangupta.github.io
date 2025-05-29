import fs from 'fs';
import path from 'path';
import * as yamlFront from 'yaml-front-matter';
import { computeWPM, extractDate, getRelativePath } from './utils.js';
import { TEXT_FILE_EXTENSIONS, WORDS_PER_MINUTE } from './const.js';
import { FrontMatter, PageMetadata, PageContentType, PageType, SiteSection, MARKDOWN, HTML, TEXT, UNKNOWN, BuildOptions, ConfigFile } from './types.js';
import { processMarkdownContent } from './markdown.js';
import purifyDOM from './purifyDOM.js';
import convertHTMLToJSON from './convertHTMLToJSON.js';

export async function processFile(root: string, dist: string, file: string, config: ConfigFile): Promise<PageMetadata | undefined> {
    const buildOptions = config.build;
    const sections = config.sections;

    const relativePath = getRelativePath(root, file);
    const extension = path.extname(file);
    const contentPath = getContentPath(root, dist, file);

    console.log('Processing file: ', relativePath);
    const stats = fs.lstatSync(file);

    if (stats.isSymbolicLink()) {
        console.log('  skipping symkink: ', file);
        return;
    }

    if (stats.isDirectory()) {
        // create same in dist
        if (file.startsWith(root)) {
            const suffix = file.substring(root.length);
            const folder = path.join(dist, suffix);
            fs.mkdirSync(folder);
            return;
        }

        console.warn('  Unable to create child folder: ', file);
    }

    // non-text file, process as is
    if (!TEXT_FILE_EXTENSIONS.includes(path.extname(file))) {
        copyProcessingFile(root, dist, file);
        return;
    }

    // check if the file has some kind of yaml front matter
    const fileContents = (fs.readFileSync(file, 'utf8') || '').trim();
    const frontMatter: FrontMatter = yamlFront.loadFront(fileContents);

    const contentsWithoutMatter: string = frontMatter.__content || '';
    delete frontMatter.__content;

    const hasFrontMatter = Object.keys(frontMatter).length > 0;

    if (!hasFrontMatter) {
        // copy this file as is
        copyProcessingFile(root, dist, file);
        return;
    }

    const section = findSection(sections || [], relativePath);

    // this file needs to be processed
    // create the metadata
    const metadata: PageMetadata = {
        id: relativePath,
        title: frontMatter.title || path.parse(file).name,
        path: ensureStartingSlash(removeExtension(frontMatter.path || relativePath)),
        contentPath: getRelativeContentPath(root, dist, file),
        category: frontMatter.category || '',
        description: frontMatter.description || '',
        date: extractDate(frontMatter.date, stats),
        published: frontMatter.published || true,
        tags: frontMatter.tags || [],
        expiry: extractDate(frontMatter.expiry),
        series: frontMatter.series || '',
        type: getType(extension),
        readingTime: computeWPM(contentsWithoutMatter, WORDS_PER_MINUTE),
        alias: frontMatter.alias || [],

        pageType: section?.type === 'blog' ? PageType.BLOG_POST : PageType.PAGE,
        section: section?.id || '',
    };

    const encoding = buildOptions?.encodeOutput ? 'base64' : 'utf8';

    // check if this is markdown or html
    try {
        switch (extension) {
            case '.md':
            case '.markdown':
                let generatedHTML = buildOptions?.processMarkdown
                    ? await processMarkdownContent(contentsWithoutMatter, frontMatter)
                    : contentsWithoutMatter;

                // purify the DOM
                generatedHTML = purifyDOM(generatedHTML);

                // convert this HTML to JSON
                const jsonFromHTML = await convertHTMLToJSON(generatedHTML);

                writeProcessedFile(contentPath, MARKDOWN, {
                    data: Buffer.from(jsonFromHTML).toString(encoding),
                    ...metadata
                });
                break;

            case '.html':
            case '.htm':
            case '.txt':
            case '.text':
                writeProcessedFile(contentPath, HTML, {
                    data: Buffer.from(contentsWithoutMatter).toString(encoding),
                    ...metadata
                });
                break;

            default:
                console.warn('  Unknown file type with front-matter: ', extension);
        }
    } catch (error) {
        console.error('  Unable to write file: ', error);
    }

    // if published, and not expired, then write data to the site
    // all done, include in the site
    return metadata;
}

function findSection(sections: SiteSection[], relativePath: string): SiteSection | undefined {
    if (!sections || sections.length === 0) {
        return;
    }

    if (relativePath.at(0) === '/') {
        relativePath = relativePath.substring(1);
    }

    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        if (relativePath.startsWith(section.id + '/')) {
            return section;
        }
    }
}

/**
 * Copy the file from root path to the dist path.
 * 
 * @param root 
 * @param dist 
 * @param file 
 */
function copyProcessingFile(root: string, dist: string, file: string): void {
    const suffix = file.substring(root.length);
    console.log('  copying file: ', suffix);
    const dest = path.join(dist, suffix);
    fs.copyFileSync(file, dest);
}

/**
 * 
 * @param root the root folder for the website
 * @param dist the dist folder for the website
 * @param file the file being processed
 * @returns the modified path for the content file
 */
function getContentPath(root: string, dist: string, file: string): string {
    const suffix = file.substring(root.length);
    const dest = path.join(dist, suffix);

    // replace extension in dest to json
    const destPath = path.parse(dest);
    const modified = path.join(destPath.dir, destPath.name + '.json');
    return modified;
}

function getRelativeContentPath(root: string, dist: string, file: string): string {
    const relative = getContentPath(root, dist, file);
    if (relative.startsWith(dist)) {
        return relative.substring(dist.length);
    }

    return relative;
}

/**
 * Write the processed file at the given path ensuring
 * to convert any object to JSON-string before writing.
 * 
 * @param contentPath 
 * @param data 
 */
function writeProcessedFile(contentPath: string, pageType: PageContentType, data: Record<string, any>): void {
    console.log('  writing file: ', contentPath);
    if (pageType) {
        data.type = pageType;
    }

    const dataAsJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(contentPath, dataAsJson);
}

/**
 * Get the type of the file based on the extension.
 * 
 * @param extension the file extension
 * @returns the type of the file
 */
function getType(extension: string): PageContentType {
    switch (extension) {
        case '.md':
        case '.markdown':
            return MARKDOWN;

        case '.html':
        case '.htm':
            return HTML;

        case '.txt':
        case '.text':
            return TEXT;

        default:
            return UNKNOWN;
    }
}

/**
 * Remove extension from file path
 * 
 * @param file the file path to remove extension from
 * @returns the file path without extension
 */
function removeExtension(file: string): string {
    const ext = path.extname(file);
    return file.substring(0, file.length - ext.length);
}

/**
 * Ensure that the path starts with a slash
 * 
 * @param str the string to ensure starts with a slash
 * @returns the string with a starting slash
 */
function ensureStartingSlash(str: string): string {
    if (str.startsWith('/')) {
        return str;
    }

    return '/' + (str || '');
}
