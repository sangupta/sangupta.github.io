import { Component } from "preact";
import { PropsWithSite, Site } from "./types";
import Sidebar from "./Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./Router";

export default class Skylight extends Component<PropsWithSite> {

    render() {
        const { site } = this.props;

        return <>
            <Header site={site} />
            <div className='content'>
                <aside className='sidebar'>
                    <Sidebar site={site} />
                </aside>
                <main>
                    <Router site={site} />
                    <Footer site={site} />
                </main>
            </div>
        </>
    }
}
