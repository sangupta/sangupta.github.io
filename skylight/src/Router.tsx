import { Component } from "preact";
import { PropsWithSite } from "./types";
import EventNames from "./EventNames";
import Evem from "./Evem";
import NotFound from "./pages/NotFound";
import Page from "./pages/Page";
import SiteHome from "./pages/SiteHome";
import SectionHome from "./pages/SectionHome";
import equalsIgnoreStartSlash from "./utils/equalsIgnoreStartSlash";
import SectionArchive from "./pages/SectionArchive";

interface RouterState {
    route?: string;
}

export default class Router extends Component<PropsWithSite> {

    state: RouterState = {
        route: window.location.pathname
    };

    componentDidMount(): void {
        window.addEventListener('popstate', this.handleBrowserBackButton);
        Evem.on(EventNames.ROUTE_CHANGE, this.changeRoute);
    }

    componentWillUnmount(): void {
        window.removeEventListener('popstate', this.handleBrowserBackButton);
        Evem.off(EventNames.ROUTE_CHANGE, this.changeRoute);
    }

    handleBrowserBackButton = (e: Event): void => {
        e.preventDefault();
        e.stopPropagation();

        const { pathname } = window.location;
        this.setState({ route: pathname });
    }

    changeRoute = (e: Event): void => {
        const ce = e as CustomEvent;
        const route = ce.detail.route;

        if (route !== this.state.route) {
            window.history.pushState({}, '', route);
            this.setState({ route });
        }
    }

    render() {
        const { site } = this.props;
        const { route = '' } = this.state;

        const cleanRoute = route.trim();
        const question = cleanRoute.indexOf('?');
        const path = question >= 0 ? cleanRoute.substring(0, question) : cleanRoute;

        console.log('requesting page: ', path);

        const page = site.pages?.find(page => page.path === path);
        if (!page) {
            // check if this page is the home page
            if (path === '/') {
                return <SiteHome site={site} />
            }

            // check if this is a blog home
            const section = site.sections?.find(section => equalsIgnoreStartSlash(section.id, path));
            if (section) {
                return <SectionHome key={section.id} site={site} section={section} />
            }

            // check if this is an archive page
            const archiveSection = site.sections?.find(section => equalsIgnoreStartSlash(section.id + '/archive', path));
            if (archiveSection) {
                return <SectionArchive key={archiveSection.id} site={site} section={archiveSection} />
            }

            // nothing to do
            return <NotFound />
        }

        return <Page key={page.id} page={page} site={site} />
    }

}
