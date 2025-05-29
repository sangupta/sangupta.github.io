import { Component } from "preact";
import { SkylightSection } from "../types";
import Link from "./Link";
import resolveUrl from "../utils/resolveUrl";

interface SidebarSectionProps {
    section: SkylightSection;
}

export default class SidebarSection extends Component<SidebarSectionProps> {

    render() {
        const { section } = this.props;
        const { label, path = '', subTitle, links } = section;

        const href = path.startsWith('/') ? path : '/' + path;

        return <div class='sidebar-link'>
            <Link href={href}>{label}</Link>
            {subTitle && <div class='sidebar-kick'>{subTitle}</div>}
            {links && <div class='sidebar-links'>
                {links.map(link => {
                    return <>
                        <Link href={resolveUrl(section.path, link.path)}>{link.label}</Link>
                    </>
                })}
            </div>
            }
        </div>
    }

}
