---
title: Rate-Limited Java Client Dribbble API
date: 18 Apr 2012
tags: 
- java
- my-projects
alias:
- /tech/rate-limited-java-client-dribbble-api.html
- /2012/04/rate-limited-java-client-dribbble-api.html
---

I am happy to finish and open-source a strongly-typed, rate-limited Java Client library for 
<a href="http://dribbble.com/">Dribbble</a> called `dribbble-java-client`.

`dribbble-java-client` is a strongly typed Java library for accessing 
<a href="http://dribbble.com/">http://dribbble.com</a> API. The library provides 
support for rate limiting requests. All objects implement the necessary 
`equals`, `hashcode` and `toString` methods for easier usage. Also, implemented is 
the Comparable interface for comparison and sorting.
<!-- break here -->

The library also exposes a convenience class called 
`DribbbleInvoker` that may be used to add more APIs (should they get added in 
future and this library looses track). The invoker is rate-limit safe.

Usage
-----

```java
DribbbleClient client = new DribbbleClient();

// get info on shot with ID: 1
Shot shot = client.getShot(1);

// get info on this shot's player
Player player = client.getPlayer(shot.getPlayer().getId());

// do more...
```

Pagination Support
------------------
All API methods that support pagination have a corresponding, pagination-aware 
method available as well. For example, when fetching comments for a shot you may do,

```java
DribbbleClient client = new DribbbleClient();

CommentList list = getShotComments(1);

// do something with these comments
if(list.getPage() < list.getPages()) {
    list = getShotComments(1, 2); // to get default page 2

    // or, may provide the number of results to fetch as well
    list = getShotComments(1, 2, 15);
}

// get more comments
```

The current default for number of results per page is 15 per Dribbble API. Refer 
<a href="http://dribbble.com/api">http://dribbble.com/api</a> for more details.

Project Links
-------------
More details on the project can be found on project home page, 
<a href="http://www.sangupta.com/projects/dribbble-java-client">http://www.sangupta.com/projects/dribbble-java-client</a>.
<br>Source Code: 
<a href="https://github.com/sangupta/dribbble-java-client">https://github.com/sangupta/dribbble-java-client</a>
<br>Downloads: 
<a href="https://github.com/sangupta/dribbble-java-client/downloads">https://github.com/sangupta/dribbble-java-client/downloads</a>
<br>Issue Management: 
<a href="https://github.com/sangupta/dribbble-java-client/issues">https://github.com/sangupta/dribbble-java-client/issues</a>
<br>Usage Instructions: 
<a href="https://github.com/sangupta/dribbble-java-client/blob/master/README.md">https://github.com/sangupta/dribbble-java-client/blob/master/README.md</a> 

Hope this helps.