import { POSTS_PER_PAGE } from "../Constants";
import { SitePage } from "../types";
import { sortPostsAsc, sortPostsDesc } from "./sortPosts";

export interface FilterPagesResult {
    pages: SitePage[];
    currentPage: number;
    totalPages: number;
}

/**
 * Function that is used to filter pages based on the different parameters.
 * Pagination support is handled by the query parameter `page`.
 * 
 * @param pages 
 * @param tag 
 * @param category 
 * @param series 
 * @param page 
 * @returns 
 */
export default function filterPages(
    pages?: SitePage[],
    pageType: string = '',
    section: string = '',
    category: string = '',
    series: string = '',
    fetchAll: boolean = false
): FilterPagesResult {
    // if no pages, return empty array
    if (!pages || pages.length === 0) {
        return {
            pages: [],
            currentPage: 1,
            totalPages: 0
        }
    }

    // check for query params for paging support
    const urlParams = new URLSearchParams(window?.location?.search || '');
    const page: number = Number(urlParams.get('page') || 1);
    const tag: string = urlParams.get('tag') || '';
    const order: string = urlParams.get('order') || 'desc';

    // filter for pageType
    if (pageType) {
        pages = pages.filter(page => {
            return page.pageType === pageType;
        });
    }

    // for section
    if (section) {
        pages = pages.filter(page => {
            return page.section === section;
        });
    }

    // for category
    if (category) {
        pages = pages.filter(page => {
            return page.category === category;
        });
    }

    // for series
    if (series) {
        pages = pages.filter(page => {
            return page.series === series;
        });
    }

    // for tags
    if (tag) {
        pages = pages.filter(page => {
            return page.tags.includes(tag);
        });
    }

    // now sort the posts
    const sortedPages = order.toLowerCase() === 'asc' ? sortPostsAsc(pages) : sortPostsDesc(pages);

    // if fetchAll is true, return all pages
    if (fetchAll) {
        return {
            pages: sortedPages,
            totalPages: 1,
            currentPage: 1
        };
    }

    // check for page
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    if (start > sortedPages.length) {
        return {
            pages: [],
            totalPages: sortedPages.length,
            currentPage: page
        };
    }

    return {
        pages: sortedPages.slice(start, end),
        totalPages: sortedPages.length,
        currentPage: page
    };
}
