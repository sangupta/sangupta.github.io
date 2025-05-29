import DOMPurify from 'isomorphic-dompurify';

export default function purifyDOM(html: string): string {
    return DOMPurify.sanitize(html);
}