// import { Site } from "../types";
// import { sortPostsDesc } from "./sortPosts";

// export default function readSite(site:Site): Blog {
//     if (!blogJson?.posts) {
//         return {
//             posts: [],
//             categories: [],
//             tags: [],
//             series: [],
//             categoryCount: {},
//         };
//     }

//     const categories: Set<string> = new Set();
//     const tags: Set<string> = new Set();
//     const series: Set<string> = new Set();
//     const categoryCount: Record<string, number> = {};

//     blogJson.posts.forEach((post) => {
//         post.category && categories.add(post.category);
//         post.series && series.add(post.series);

//         categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;

//         post.tags?.forEach((tag) => tags.add(tag));
//     });

//     const blog: Blog = {
//         posts: sortPostsDesc(blogJson.posts),
//         categories: Array.from(categories).sort(),
//         tags: Array.from(tags).sort(),
//         series: Array.from(series).sort(),
//         categoryCount: categoryCount,
//     };

//     return blog;
// }
