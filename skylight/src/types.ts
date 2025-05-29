export interface Brand {
    icon?: string;
    iconAlt?: string;
}

export interface LabelAndPath {
    label: string;
    path: string;
}

export interface SkylightSection {
    label: string;
    path: string;
    subTitle?: string;
    links?: Array<LabelAndPath>;
}

export interface SkylightConfig {
    pages?: Array<LabelAndPath>;
    links?: Array<LabelAndPath>;
    sections?: Array<SkylightSection>;
    socials?: SocialLink[];
}

export interface Site {
    title: string;
    baseUrl?: string;
    name?: string;
    brand?: Brand;
    skylight: SkylightConfig;
    sidebar: SiteSidebar;
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

export interface Link {
    label: string;
    href: string;
}

export interface SiteLink {
    label: string;
    subTitle?: string;
    href: string;
    links?: Array<Link>;
}

export interface PropsWithSite {
    site: Site;
}

export interface SocialLink {
    icon: string;
    path: string;
    label: string;
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