import { Component } from "preact";
import { CopyrightInfo, PropsWithSite } from "../types";

export default class Footer extends Component<PropsWithSite> {

    componentDidMount(): void {
        const element = document.querySelector('footer .prefix');
        if (!element) {
            return;
        }

        const { site } = this.props;
        element.innerHTML = site?.copyright?.message || '';
    }

    renderName = () => {
        const { site } = this.props;
        const baseUrl = site.baseUrl || '';
        const name = site?.author?.name

        if (!name) {
            return null;
        }

        return baseUrl ? <>, <a href={baseUrl}>{name}</a></> : ', ' + name;
    }

    prefix = (msg?: string) => {
        if (!msg) {
            return null;
        }

        return <span class='prefix'></span>
    }

    renderYear = (copyright?: CopyrightInfo) => {
        const year = new Date().getFullYear();;
        if (!copyright) {
            return year;
        }

        if (copyright.start) {
            const end = copyright.end || year;
            return copyright.start + '-' + end;
        }
    }

    render() {
        const { site } = this.props;
        const { copyright } = site;

        return <footer>
            {this.prefix(copyright?.message)} Copyright &copy; {this.renderYear(copyright)}{this.renderName()}.
        </footer>
    }

}
