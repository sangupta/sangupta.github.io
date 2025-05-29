import { Component } from 'preact';
import { PropsWithSite, SiteLink, SiteSection, SocialLink } from './types';
import SidebarLink from './components/SidebarLink';
import SvgIcon from './components/SvgIcon';
import Footer from './components/Footer';

export default class Sidebar extends Component<PropsWithSite> {

    renderBlogs(sections?: SiteSection[]) {
        if (!sections || sections.length === 0) {
            return null;
        }

        return sections?.map(section => {
            const links: SiteLink[] = [];
            if (section.archive) {
                links.push({ label: 'Archive', path: section.id + '/archive' });
            }
            if (section.feed) {
                links.push({ label: 'RSS', path: section.id + '/rss' });
            }
            
            return <SidebarLink label={section.title} path={section.id} description={section.description} links={links} />
        });
    }

    renderSocialLinks(socials?: SocialLink[]) {
        if (!socials) {
            return null;
        }

        return <div class='sidebar-socials'>
            {socials.map(social => {
                return <a class='social-link' href={social.link} target='_blank'>
                    <SvgIcon type={social.type} />
                </a>
            })}
        </div>
    }

    render() {
        const { site } = this.props;
        const blogs = site.sections || [];

        return <>
            {this.renderBlogs(blogs)}
            {this.renderSocialLinks(site.socials)}
        </>
    }

}
