import { Component, render } from 'preact';
import { Site } from './types';
import Skylight from './Skylight';
import buildSiteJson from './utils/buildSiteJson';

export interface AppProps {
    siteJsonUrl?: string;
}

export interface AppState {
    loading: boolean;
    hasError: boolean;
    site?: Site;
}

class App extends Component<AppProps, AppState> {

    state: AppState = {
        loading: true,
        hasError: false,
    }

    getSiteJsonUrl = (): string => {
        const { siteJsonUrl = '' } = this.props;
        if (siteJsonUrl) {
            return siteJsonUrl;
        }

        // try reading it from the data attribute on the body element
        const dataUrl = document.body.getAttribute('data-site-json-url');
        if (dataUrl) {
            return dataUrl;
        }

        // the fallback - this allows to showcase my own site
        return 'site.json';
    }

    componentDidMount = async (): Promise<void> => {
        const url = this.getSiteJsonUrl();
        if (!url) {
            // return
        }

        try {
            const response = await fetch(url);
            const json: Site = await response.json();
            this.setState({
                loading: false,
                hasError: false,
                site: buildSiteJson(json)
            });
        } catch (e) {
            this.setState({
                loading: false,
                hasError: true,
            });
        }
    }

    render() {
        const { loading, hasError, site } = this.state;
        if (loading) {
            return <div>Loading...</div>
        }

        if (hasError || !site) {
            return <div>Error loading site data</div>
        }

        return <Skylight site={site} />
    }

}

render(<App />, document.body);
