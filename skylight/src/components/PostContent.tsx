import { Component, createRef } from "preact";

interface PostContentProps {
    content: string;
    summaryOnly?: boolean;
}

export default class PostContent extends Component<PostContentProps> {

    render() {
        const { content } = this.props;

        const json = JSON.parse(content);
        console.log(json);
        
        return <div className='blog-post-content'>
            <JsonToHtml json={json.content} />
        </div>
    }

}

interface JsonToHtmlProps {
    json: any;
}

class JsonToHtml extends Component<JsonToHtmlProps> {
    render() {
        const { json } = this.props;

        if (typeof json === 'string') {
            return json;
        }

        if (Array.isArray(json)) {
            return json.map((item, i) => {
                return <JsonToHtml key={i} json={item} />
            });
        }

        if (!json) {
            return null;
        }

        const Element: any = json.type;
        if (Element) {
            return <Element {...(json.attributes || {})}>
                <JsonToHtml json={json.content} />
            </Element>
        }

        return null;
    }
}