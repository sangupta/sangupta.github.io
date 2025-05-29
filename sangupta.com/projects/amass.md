---
layout: project
title: Amass
github: amass
maven: true
---

`amass` is a high-throughput enterprise-grade web-crawler that crawls specific URLs. It can be used to fetch 
millions of url's per hour. `amass` is different than other crawlers like `crawler4j` that it does not crawl
the nested pages. Instead it just gathers and collects various URLs as supplied. Thus, it **amasses** specific
data from the internet, and hence the name `amass`.

### Features

* Enterprise-grade: crawl milions of URLs without worry
* A priority based queue for crawling urgent URLs faster
* Support for pre-crawl and post-crawl handler
* Mechanism to prevent crawling via the pre-crawl handler
* Support for multiple submission of a URL, which increase its priority
* Nano-time accuracy for ordering when priority is the same

### License

The library is released under the terms of **Apache Public License Version 2**.
