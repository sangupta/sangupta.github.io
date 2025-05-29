import { HTMLToJSON } from 'html-to-json-parser';

export default async function convertHTMLToJSON(html: string): Promise<any> {
    html = `<div class='content'>${html}</div>`;
    const json = await HTMLToJSON(html, true);
    return json
}
