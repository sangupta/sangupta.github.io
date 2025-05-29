---
title: Revisiting the blog
date: 16 Apr 2022
tags: 
- just-like-that
alias:
- /tech/revisiting-the-blog.html
---

It has been many years I wrote something worthy. A lot has changed since then. In these years
front-end development has become more advanced with technologies like [ReactJS][1], [Vue][9], 
[Svelte][15] etc. Static sites need no longer confined to generate-time data and basic text
processing. They should be able to make use of [web components][16] to better the user experience.

Today, as I look at this space it feels out-dated, pale and buggy. The headers and left-hand 
pane are not truly responsive. The typography does not properly align. Colors need more work.
But these are least of my concerns. As a developer, I still have no true control over the way 
I write (seldom) and it gets published. For example, why should all posts be in a single folder, 
or in sub-folders based on date/time, or based on tag names? 

With [Jekyll][4] setting up the site/blog or adding a new section within the existing one is 
difficult. Posts  can only be recognized and paginated from under the `_posts` folder.  There 
is no way to filter the posts. The software required to generate locally (ruby, bundler) etc
itself takes time to install. And then you run into version issues. It took me 30+ minutes today
get Jekyll running again. I believe we developers should do better here.

As I go over the latest [documentation][19] ([version 4.2.2][18]), I can't find an easy way: 

* to customize functionality using Javascript
* no way to optimize/thumbnail images directly
* pull HTTP data to merge into posts
* creating automatic post excerpt
* inline/donwload external images
* support for [Velocity templates][17] (yes, I come from Java world)
* customizing date format to be used
* and more...

I am sure there would be 3rd party plugins to support some of the above. However, I think this
is something that should be supported out of the box. Over the next couple of days, I will evaluate 
the latest in static site generators. Have heard a lot about [Hugo][5], [Gatsby][6] and [Next][7]. 
Time to find a worthy replacement for [Jekyll][4].

[1]: https://reactjs.org
[2]: https://vlang.io
[3]: https://go.dev
[4]: https://jekyllrb.com
[5]: https://gohugo.io
[6]: https://gatsbyjs.org
[7]: https://nextjs.org
[8]: https://github.com
[9]: https://vuejs.org
[10]: https://stedolan.github.io/jq
[11]: https://github.com/rupa/z
[12]: https://httpie.io
[13]: https://esbuild.github.io
[14]: https://parceljs.org
[15]: https://svelte.dev
[16]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[17]: https://velocity.apache.org
[18]: https://github.com/jekyll/jekyll/releases/tag/v4.2.2
[19]: https://jekyllrb.com/docs/