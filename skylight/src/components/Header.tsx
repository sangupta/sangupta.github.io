import { Component } from "preact";
import { LabelAndPath, PropsWithSite, SitePage } from "../types";
import Link from "./Link";

export default class Header extends Component<PropsWithSite> {

    renderLinks = (className: string, pages?: LabelAndPath[]) => {
        if (!pages || pages.length === 0) {
            return null;
        }

        return <div class={className}>
            {pages.map(page => {
                return <Link href={page.path}>{page.label}</Link>
            })}
        </div>
    }

    render() {
        const { site } = this.props;

        return <header>
            <Link href='/' class='brand'>
                <img class='brand-logo' src={site?.brand?.icon} alt={site?.brand?.iconAlt} />
                <span class='brand-name'>{site.name}</span>
            </Link>
            <div class='header-links'>
                {this.renderLinks('left', site.skylight?.pages)}
                {this.renderLinks('right', site.skylight?.links)}
            </div>
        </header>
    }

}
