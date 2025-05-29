import { Component } from "preact";
import { PropsWithSite, Site, SiteLink } from "../types";
import Link from "./Link";
import resolveUrl from "../utils/resolveUrl";

export default class Header extends Component<PropsWithSite> {

    renderLinks(hasLinks: boolean, links?: SiteLink[]) {
        if (!hasLinks) {
            return null;
        }

        return links?.map(link => {
            return <Link href={link.path}>{link.label}</Link>
        })
    }

    renderHeaderLinks(site: Site) {
        const header = site.theme?.config?.header;
        if (!header) {
            return null;
        }

        const hasLhs = (header.lhs?.links?.length || 0) > 0;
        const hasRhs = (header.rhs?.links?.length || 0) > 0
        if (!hasLhs && !hasRhs) {
            return null;
        }

        return <div class='header-links'>
            <div class='left'>
                {this.renderLinks(hasLhs, header.lhs?.links)}
            </div>
            <div class='right'>
                {this.renderLinks(hasRhs, header.rhs?.links)}
            </div>
        </div>
    }

    render() {
        const { site } = this.props;

        const logoUrl = resolveUrl(site.baseUrl, site.icon);

        return <header>
            <Link href='/' class='brand'>
                <img class='brand-logo' src={logoUrl} alt={site.iconAlt || ''} />
                <span class='brand-name'>{site.title}</span>
            </Link>
            {this.renderHeaderLinks(site)}
        </header>
    }

}
