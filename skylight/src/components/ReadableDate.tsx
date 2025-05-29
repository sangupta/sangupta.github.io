import { FunctionComponent } from "preact";

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

interface ReadableDateProps {
    date: number;
    class?: string;
}

const ReadableDate: FunctionComponent<ReadableDateProps> = ({ date, class: className }) => {
    if (!date) {
        return null;
    }

    const d = new Date(date);
    return <span class={className}>{MONTHS[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</span>
}

export default ReadableDate;
