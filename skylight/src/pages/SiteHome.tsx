import { Component } from "preact";
import { PropsWithSite } from "../types";
import Page from "./Page";
import filterPages from "../utils/filterPages";
import Pagination from "../components/Pagination";

export default class SiteHome extends Component<PropsWithSite> {

    render() {
        const { site } = this.props;

        // filter pages that are part of blogs
        const filtered = filterPages(site?.pages, 'blog-post');

        const pages = filtered.pages.map(page => {
            return <Page key={page.id} page={page} site={site} summaryOnly={true} />
        });

        return <>
            {pages}

            <Pagination
                current={filtered.currentPage}
                total={filtered.totalPages}
                path=''
            />
        </>
    }

}
