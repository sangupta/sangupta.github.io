---
layout: project
title: SSL Proxy
github: sslproxy
---

`sslproxy` is a Jetty based proxy-server to serve image files from non-secure domains, securely to one's client.
Thus, clients at https://example.com can access a resource at http://someotherdomain.com/image.png over SSL using
a proxy at say, https://proxy.example.com/hash/key.

This allows to make sure that your users always view the green lock and never a yellow lock in the browser's address
bar due to insecure content.

The project is based on the awesome https://github.com/atmos/camo project that Github 
uses to make its assets look secure. However, we only support the URL format of 

```
http://server/security-code/base-64-url
```

### Features

* Very light weight and fast proxy server
* Adds cache headers for one year
* Rejects all non-image proxy requests
* Contains security check to disallow non-genuine clients
* In-built memory caching using Google Guava
* Display of cache stats via simple HTML call

### License

The library is released under the terms of **Apache Public License Version 2**.
