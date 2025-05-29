import { Component } from "preact";
import Evem from "../Evem";
import EventNames from "../EventNames";

interface LinkProps {
    route?: string;
    href: string;
    className?: string;
    class?: string;
}

export default class Link extends Component<LinkProps> {

    handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const { route, href } = this.props;
        Evem.emit(EventNames.ROUTE_CHANGE, { route: route || href });
    }

    render() {
        const { route, href = '#', children, ...rest } = this.props;
        return <a href={href} onClick={this.handleClick} {...rest}>{children}</a>
    }

}
