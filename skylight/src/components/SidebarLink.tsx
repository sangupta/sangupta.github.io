import { Component } from "preact";
import { SiteLink } from "../types";
import Link from "./Link";

interface SidebarLinkProps {
    label: string;
    path: string;
    description?: string;
    links?: SiteLink[];
}

export default class SidebarLink extends Component<SidebarLinkProps> {

    render() {
        const { label, path, description, links } = this.props;

        const href = path.startsWith('/') ? path : '/' + path;

        return <div class='sidebar-link'>
            <Link href={href}>{label}</Link>
            {description && <div class='sidebar-kick'>{description}</div>}
            {links && <div class='sidebar-links'>
                {links.map(link => {
                    return <>
                        <Link href={link.path}>{link.label}</Link>
                        {link.description && <div class='link-desc'>{link.description}</div>}
                    </>
                })}
            </div>
            }
        </div>
    }

}
