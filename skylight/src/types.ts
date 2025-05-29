export interface Site {
    title: string;
    baseUrl?: string;
    name?: string;
    icon?: string;
    iconAlt?: string;
    sidebar: SiteSidebar;
    socials?: SocialLink[];
    header?: SiteHeader;
    author?: Author;
    pages?: SitePage[];
    theme?: SiteTheme;
    sections: SiteSection[];
    copyright?: CopyrightInfo;
}

export interface CopyrightInfo {
    start?: number;
    end?: number;
    message?: string;
}

export interface SiteSection {
    id: string;
    title: string;
    type: string;
    feed?: boolean;
    archive?: boolean;
    description?: string;
    summarize?: boolean;
}

export interface SiteTheme {
    config: any;
}

export interface SitePage {
    id: string;
    title: string;
    path: string;
    category?: string;
    description?: string;
    pageType: string;
    section: string;
    date: number;
    published?: boolean;
    tags: string[];
    expiry: number;
    series?: string;
    summary?: string;
    readingTime?: number;
    contentPath?: string;
    content?: string;
    contentType?: string;
}

export interface Author {
    name: string;
    email: string;
    url: string;
}

export interface SiteSidebar {
    showBlogs: boolean;
    links?: SiteLink[];
}

export interface SiteLink {
    type?: string;
    label: string;
    path: string;
    description?: string;
}

export interface PropsWithSite {
    site: Site;
}

export interface SocialLink {
    type: string;
    link: string;
}

export interface SiteHeader {
    lhs: SiteHeaderSide;
    rhs: SiteHeaderSide;
}

export interface SiteHeaderSide {
    links?: SiteLink[];
}

export interface PageContent {
    type: string;
    data: string;
}

export const BLOG_POST = 'blogPost';
export const PAGE = 'page';
export const BOOK_PAGE = 'bookPage';
export const LINK = 'link';
export const UNKNOWN = 'unknown';

export const PageType = {
    BLOG_POST,
    PAGE,
    BOOK_PAGE,
    LINK,
    UNKNOWN
}