export default function resolveUrl(path1?: string, path2?: string): string {
    if (!path1) {
        if (!path2) {
            return '';
        }

        return path2;
    }

    if (!path2) {
        return path1;
    }
    
    if (path1.endsWith('/') && path2.startsWith('/')) {
        return path1 + path2.substring(1);
    }

    if (!path1.endsWith('/') && !path2.startsWith('/')) {
        return path1 + '/' + path2;
    }

    return path1 + path2;
}
