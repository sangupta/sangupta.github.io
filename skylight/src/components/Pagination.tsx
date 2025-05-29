import { Component } from "preact";

interface PaginationProps {
    current: number;
    total: number;
    path: string;
}

export default class Pagination extends Component<PaginationProps> {

    render() {
        const { current, total, path } = this.props;

        let start = current - 2;
        if (start < 1) {
            start = 1;
        }
        let end = start + 4;
        if (end > total) {
            end = total;
        }

        const pages: any[] = [];
        for (let i = start; i <= end; i++) {
            pages.push(<li class={"page-item" + (i === current ? ' active' : '')}>
                <a class="page-link" href={path + '?page=' + i}>{i}</a>
            </li>);
        }

        const hasPrev = current > 1;
        const hasNext = !(current === total);

        return <nav class='mx-auto'>
            <ul class='pagination'>
                <li class="page-item">
                    <a class={"page-link" + (!hasPrev ? ' disabled' : '')} href={hasPrev ? (path + '?page=' + (current - 1)) : "#"}>Previous</a>
                </li>
                {pages}
                <li class="page-item">
                    <a class={"page-link" + (!hasNext ? ' disabled' : '')} href={hasNext ? (path + '?page=' + (current + 1)) : "#"}>Next</a>
                </li>
            </ul>
        </nav>
    }
}
