export default function equalsIgnoreStartSlash(a: string, b: string): boolean {
    if (a === b) {
        return true;
    }

    if (!a.startsWith('/')) {
        a = '/' + a;
    }

    if (!b.startsWith('/')) {
        b = '/' + b;
    }

    return a === b;
}
