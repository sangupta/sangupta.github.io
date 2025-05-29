import { Component, render } from 'preact';
import { Site } from './types';
import Skylight from './Skylight';
import buildSiteJson from './utils/buildSiteJson';
import { SITE_JSON_URL } from './Constants';

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

    componentDidMount = async (): Promise<void> => {
        try {
            const response = await fetch(SITE_JSON_URL);
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
