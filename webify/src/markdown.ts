import { FrontMatter } from './types';
import { marked } from 'marked';

const codeRenderer = {
    /**
     * 
     * @param code the actual code string between the triple-ticks
     * @param infostring the infostring after opening triple-ticks, usually the language
     * @param escaped 
     * @returns 
     */
    code(code: string, infostring: string | undefined, escaped: boolean): (string | false) {
        return `<pre><code lang=${infostring}>${code}</code></pre>`;
    }
};

marked.use({ renderer: codeRenderer });

export async function processMarkdownContent(contents: string, frontMatter: FrontMatter): Promise<any> {
    return marked.parse(contents);
}
