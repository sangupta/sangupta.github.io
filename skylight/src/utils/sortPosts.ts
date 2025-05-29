import { SitePage } from "../types";

export function sortPostsDesc(posts: SitePage[]): SitePage[] {
    return posts.sort((a, b) => b.date - a.date);
}

export function sortPostsAsc(posts: SitePage[]): SitePage[] {
    return posts.sort((a, b) => a.date - b.date);
}
