# webify

`webify` is a simple static site generator (SSG) that uses 
markdown/HTML files to generate a Single Page Application 
website utilizing JSON for content.

## Difference with other SSG's

`webify` is different from almost all other SSG's because it
does not generate individual HTML files as output to be hosted.
Instead it generates a bunch of JSON files that are then consumed
by a Single Page Application (SPA, like a React application) to
render the entire site.

Check out https://sangupta.com that is built using `webify`.

# Usage

```sh
$ npx @sangupta/webify {configFile} {distPath}
```

where, `configFile` is the path to the `webify.json` file that
defines various build options, and `distPath` is the path to
the folder, where the output is written.

**Note:** Once the site is built, you can use a SPA like 
https://github.com/sangupta/skylight to render the site.

# License

Apache License 2.0. Copyright (C) 2024, Sandeep Gupta.
