import { Component } from "preact";
import { PropsWithSite, SitePage } from "../types";
import ReadableDate from "./ReadableDate";
import Tags from "./Tags";
import ReadingTime from "./ReadingTime";
import EventNames from "../EventNames";
import Evem from "../Evem";

interface ArchiveTileProps extends PropsWithSite {
    page: SitePage;
}

export default class ArchiveTile extends Component<ArchiveTileProps> {

    loadPage = () => {
        const { page } = this.props;
        Evem.emit(EventNames.ROUTE_CHANGE, { route: page.path });
    }

    render() {
        const { page } = this.props;

        return <div class='archive-tile'>
            <div class='metadata'>
                <ReadableDate date={page.date} />
                <ReadingTime page={page} />
                <Tags tags={page.tags} />
            </div>
            <div class='post-details' onClick={this.loadPage}>
                <h2>{page.title}</h2>
                <div class='summary'>{page.summary}</div>
            </div>
        </div>
    }

}
