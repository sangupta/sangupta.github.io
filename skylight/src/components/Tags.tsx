import { Component } from "preact";

interface TagsProps {
    tags?: string[];
}

export default class Tags extends Component<TagsProps> {

    render() {
        const { tags } = this.props;
        if (!tags || tags.length === 0) {
            return null;
        }

        return <div class='tags'>
            {tags.map(tag => {
                return <Tag label={tag} />
            })}
        </div>
    }

}

interface TagProps {
    label: string;
}

class Tag extends Component<TagProps> {

    render() {
        const { label } = this.props;
        return <span class='tag'>{label}</span>
    }

}
