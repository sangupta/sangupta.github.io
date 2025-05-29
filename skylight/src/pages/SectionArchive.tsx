import { Component } from "preact";
import { PropsWithSite, SiteSection } from "../types";
import Page from "./Page";
import filterPages from "../utils/filterPages";
import ArchiveTile from "../components/ArchiveTile";
import Tags from "../components/Tags";

interface SectionArchiveProps extends PropsWithSite {
    section?: SiteSection;
}

export default class SectionArchive extends Component<SectionArchiveProps> {

    render() {
        const { site, section } = this.props;
        const { pages = [] } = site;

        const filtered = filterPages(pages, '', section?.id, '', '', true);

        // find all tags for this section
        const tags = new Set<string>();
        filtered.pages.forEach(page => {
            page.tags.forEach(tag => tags.add(tag));
        });

        // sort tags alphabetically
        const sortedTags = Array.from(tags).sort();

        // render all tiles
        const tiles = filtered.pages.map(page => {
            return <ArchiveTile key={page.id} page={page} site={site} />
        });

        return <>
            <h1>{section?.title}</h1>
            <Tags tags={sortedTags} />
            <div class='archive-tiles'>
                {tiles}
            </div>
        </>
    }

}
