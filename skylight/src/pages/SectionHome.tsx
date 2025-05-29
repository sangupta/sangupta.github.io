import { Component } from "preact";
import { PropsWithSite, SiteSection } from "../types";
import Page from "./Page";
import filterPages from "../utils/filterPages";
import Pagination from "../components/Pagination";

interface SectionHomeProps extends PropsWithSite {
    section?: SiteSection;
}

export default class SectionHome extends Component<SectionHomeProps> {

    render() {
        const { site, section } = this.props;
        const { pages = [] } = site;

        const filtered = filterPages(pages, '', section?.id);
        // return filtered.pages.map(page => {
        //     return <Page key={page.id} page={page} site={site} summaryOnly={true} />
        // });

        const pagesToDisplay = filtered.pages.map(page => {
            return <Page key={page.id} page={page} site={site} summaryOnly={section?.summarize} />
        });

        return <>
            {pagesToDisplay}

            <Pagination
                current={filtered.currentPage}
                total={filtered.totalPages}
                path=''
            />
        </>
    }

}
