import { Component } from 'preact';
import { PropsWithSite, SiteLink, SkylightSection, SocialLink } from './types';
import SidebarSection from './components/SidebarSection';
import Footer from './components/Footer';


export default class Sidebar extends Component<PropsWithSite> {

    renderBlogs(sections?: SkylightSection[]) {
        if (!sections || sections.length === 0) {
            return null;
        }

        return sections?.map(section => {
            return <SidebarSection section={section} />
        });
    }

    renderSocialLinks(socials?: SocialLink[]) {
        return <div class='sidebar-socials'>
            {socials?.map((social: SocialLink) => {
                return <a class='social-link' href={social.path} target='_blank'>
                    <img class='svg-icon' src={social.icon} alt={social.label} />
                </a>
            })}
        </div>
    }

    render() {
        const { site } = this.props;
        const blogs = site.sections || [];

        return <>
            <div className='sidebar-sections'>
                {this.renderBlogs(site.skylight.sections)}
                {this.renderSocialLinks(site.skylight?.socials)}
            </div>
            <div className='sidebar-footer'>
                <Footer site={site} />
            </div>
        </>
    }

}
