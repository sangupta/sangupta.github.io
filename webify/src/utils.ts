import fs from 'fs';
import path from 'path';

/**
 * Check if the given string matches the given wildcard pattern.
 * 
 * @param wildcard the wildcard pattern
 * @param str the string to match
 * @returns true if the string matches the wildcard pattern, false otherwise
 */
export function wildcardTest(wildcard: string, str: string): boolean {
    let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape 
    const re = new RegExp(`^${w.replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
    return re.test(str); // remove last 'i' above to have case sensitive
}

/**
 * Extract the date from the given string. If the string is empty
 * or null, then the file stats are used to extract the date. If
 * the stats are also null, then -1 is returned.
 * 
 * @param dateStr the date string
 * @param stats the file stats
 * @returns the date in milliseconds
 */
export function extractDate(dateStr: string, stats?: fs.Stats): number {
    if (dateStr && dateStr.trim() !== '') {
        return Date.parse(dateStr);
    }

    if (stats) {
        // use file date
        return stats.mtime.getTime();
    }

    return -1;
}

/**
 * Compute the time required to read the given text.
 * 
 * @param text the text to read
 * @param wordsPerMinute the words per minute to use
 * @returns the time in minutes
 */
export function computeWPM(text: string, wordsPerMinute: number = 238): number {
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
}

/**
 * Given a file path, return the relative path by removing
 * the root, if present. It also removes the starting slash
 * if any.
 * 
 * @param root the path to root
 * @param file the path to file
 * @returns the relative path of file
 */
export function getRelativePath(root: string, file: string): string {
    const fullPath = file;
    const suffix = fullPath.substring(root.length);

    if (suffix.startsWith('/')) {
        return suffix.substring(1);
    }

    return suffix;
}

/**
 * Read a list of all files and folders for the given root path.
 * Include and/or exclude rules can be provided to filter. This
 * method reads files recursively.
 * 
 * @param root the path to root
 * @param includes an array of include wildcard patterns
 * @param excludes an array of exclude wildcard patterns
 * @returns a list of all files and folders
 */
export function readFiles(root: string, includes: Array<string> = [], excludes: Array<string> = []) {
    console.log('Reading all files from: ', root);

    let files: string[] = fs.readdirSync(root, { withFileTypes: false, recursive: true }) as string[];

    console.log('Total files before filtering: ', (files || []).length);

    // filter these files for the includes/excludes
    includes.forEach(include => {
        files = files.filter((file: string) => {
            const relativeFilePath = file;
            const matched = wildcardTest(include, relativeFilePath);
            if (!matched) {
                console.log('  Excluding ', relativeFilePath, ' as it is not part of include rule: ', include);
            }

            return matched;
        });
    });

    excludes.forEach(exclude => {
        files = files.filter((file) => {
            const relativeFilePath = file;
            const matched = !wildcardTest(exclude, relativeFilePath);
            if (!matched) {
                console.log('  Excluding ', relativeFilePath, ' as it is part of exclude rule: ', exclude);
            }

            return matched;
        });
    });

    console.log('Found a total of ', files.length, ' files.');
    return files;
}