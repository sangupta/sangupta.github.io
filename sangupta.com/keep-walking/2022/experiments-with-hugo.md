---
title: Experiments with Hugo!
date: 18 Apr 2022
tags: 
- just-like-that
alias:
- /tech/experiments-with-hugo.html
---

In continuation of my last post, [revisiting this blog][22], I spent time over weekend
experiment and convert my site to [Hugo][5]. And I was amazed at the very first
run. `Hugo` is not just fast, it is super fast. While [Jekyll][4] takes
up 3-4 seconds to start, Hugo was done in less than a second. To top it all, it
automatically detects changes to the configuration file as well and rebuilds. And
to add cherries on top of the cake, `Hugo` was emitting content in both HTML and
JSON formats to be consumed. 

I also love the way Hugo allows you to configure your site either using `YAML`, or
`TOML` or `JSON`. This allows a lot of flexibility for people who may be more
familiar and comfortable using one format than other. I loved the way that at the
flip of a configuration flag, all content (HTML/JS/CSS) was mininfied instantly.
I use [MermaidJS][18] a lot for my sequence diagrams, and loved that `Hugo` has
[support for the same][19] too.

`Hugo` has some level of customization in the form of [shortcodes][20]. It has a
decent amount of [built-in functions][21] that you may leverage. However, I was
disappointed to see no support for date format customization. I was born to read
dates in `dd/MM/yyyy` format and now reading `mm/dd/yyyy` or `yyyy-mm-dd` 
format just doesn't feel natural. Adding functionality requires writing a [Go][3]
plugin which again may not be for everyeone.

But what makes [Hugo][5] stand apart is this one word: **SPEED**. Speed in setting
it up - just download the binary and you are ready to go. Whether you are serving
locally to test, or publishing your site for production, completing everything in
less than a second is what I will call **GOD SPEED**.

However, if I were to move all my work, then I will need to change the date format
again to something `Hugo` can undertand. Wish there was a simple way to define that
in the configuration.


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
[18]: https://mermaid-js.github.io/mermaid/#/
[19]: https://gohugo.io/content-management/diagrams/#mermaid-diagrams
[20]: https://gohugo.io/templates/shortcode-templates/
[21]: https://gohugo.io/functions/
[22]: https://sangupta.com/tech/revisiting-the-blog.html