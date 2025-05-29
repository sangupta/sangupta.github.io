export interface FrontMatter {
    [key: string]: any;
    __content?: string;
}

export interface ConfigFile {
    title: string;
    baseUrl: string;
    name: string;
    build?: BuildOptions;
}

export type SectionType = 'blog' | 'link';

export interface SiteSection {
    id: string;
    title: string;
    description: string;
    archive?: boolean;
    feed?: boolean;
    type: SectionType;
}

export interface Author {
    name: string;
    email: string;
    url: string;
}

export interface BuildOptions {
    processMarkdown?: boolean;
    encodeOutput?: boolean;
    include?: Array<string>;
    exclude?: Array<string>;
}

export interface Site {
    title: string;
    baseUrl: string;
    name: string;
    pages: Array<PageMetadata>;
}

export interface SocialLink {
    type: string;
    url: string;
}

export interface PageMetadata {
    id: string; // the unique id for this page
    title: string; // the title to be displayed in the address bar
    path: string; // the path to the file relative to root
    description: string; // the description for the page
    pageType: string; // blog post, page, book page etc
    section: string; // the section this page belongs to
    category: string; // the category in which this post is filed
    date: number; // when was it created
    published: boolean; // is the file published
    tags: Array<string>; // associated tags with page
    expiry?: number; // when does this page expire?
    series?: string; // is the page part of a series, then the series name
    alias: Array<string>; // alias paths for the page
    contentPath: string; // the path to JSON file that contains the content
    type: PageContentType; // the type of the page
    readingTime: number; // the time to read in minutes
}

export const MARKDOWN = 'markdown';
export const HTML = 'html';
export const TEXT = 'text';

export type PageContentType = 'markdown' | 'html' | 'text' | 'unknown';

export const BLOG_POST = 'blog-post';
export const PAGE = 'page';
export const BOOK_PAGE = 'book-page';
export const LINK = 'link';
export const UNKNOWN = 'unknown';

export const PageType = {
    BLOG_POST,
    PAGE,
    BOOK_PAGE,
    LINK,
    UNKNOWN
}
