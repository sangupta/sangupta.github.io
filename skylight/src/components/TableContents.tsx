import { Component } from "preact";
import buildTOC from "../utils/buildTOC";

interface TableContentsProps {
    contentJson: any;
}

export default class TableContents extends Component<TableContentsProps> {

    render() {
        const { contentJson } = this.props;
        if (!contentJson) {
            return null;
        }

        const headings = buildTOC(contentJson);
        if (!headings || headings.length === 0) {
            return null;
        }

        return <nav class='table-of-contents'>
            {headings.map((heading, i) => {
                return <li>{heading}</li>
            })}
        </nav>
    }

}
