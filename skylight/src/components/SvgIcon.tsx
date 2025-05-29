const iconMap: Record<string, string> = {
    github: '/github.svg',
    twitter: '/twitter.svg',
    instagram: '/instagram.svg',
    linkedin: '/linkedin.svg',
    ycombinator: '/ycombinator.svg',
    facebook: '/facebook.svg',
    stackoverflow: '/stackoverflow.svg',
    gitlab: '/gitlab.svg',
    medium: '/medium.svg',
}

const SvgIcon = ({ type }: { type: string }) => {
    type = type.toLowerCase().trim();
    if (iconMap[type]) {
        return <img width='24' height='24' class='svg-icon' src={iconMap[type]} alt={type} />
    }

    return null;
}

export default SvgIcon;
