import { Component } from "preact";
import { PropsWithSite } from "../types";
import Router from "../Router";

export default class MainContent extends Component<PropsWithSite> {
    
    render() {
        return <Router site={this.props.site} />
    }

}
