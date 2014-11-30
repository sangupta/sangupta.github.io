---
layout: default
title: Rate-Limited Java Client Dribbble API
permalink: /2012/04/rate-limited-java-client-dribbble-api.html
redirect_from: "/2012/04/rate-limited-java-client-dribbble-api.html"
date: Wed Apr 18 14:35:00 IST 2012
sharingURL: http://blog.sangupta.com/2012/04/rate-limited-java-client-dribbble-api.html
tags: java my-projects
---
<div dir="ltr" style="text-align: left;" trbidi="on">
    I am happy to finish and open-source a strongly-typed, rate-limited Java Client library for 
    <a href="http://dribbble.com/">Dribbble</a> called 
    <b>dribbble-java-client</b>.
    <br>
    <br>
    <b>dribbble-java-client</b> is a strongly typed Java library for accessing 
    <a href="http://dribbble.com/">http://dribbble.com</a> API. The library provides support for rate limiting requests. All objects implement the necessary 
    <tt>equals</tt>, 
    <tt>hashcode</tt> and 
    <tt>toString</tt> methods for easier usage. Also, implemented is the Comparable interface for comparison and sorting.
    <br>
    <br>The library also exposes a convenience class called 
    <tt>DribbbleInvoker</tt> that may be used to add more APIs (should they get added in future and this library looses track). The invoker is rate-limit safe.
    <br>
    <br>
    <h3>Usage</h3>
    <pre class="brush: java">DribbbleClient client = new DribbbleClient();<br><br>// get info on shot with ID: 1<br>Shot shot = client.getShot(1);<br><br>// get info on this shot's player<br>Player player = client.getPlayer(shot.getPlayer().getId());<br><br>// do more...<br></pre>
    <br>
    <h3>Pagination Support</h3>All API methods that support pagination have a corresponding, pagination-aware method available as well. For example, when fetching comments for a shot you may do,
    <br>
    <br>
    <pre class="brush: java">DribbbleClient client = new DribbbleClient();<br><br>CommentList list = getShotComments(1);<br><br>// do something with these comments<br><br>if(list.getPage() &lt; list.getPages()) {<br>    list = getShotComments(1, 2); // to get default page 2<br><br>    // or, may provide the number of results to fetch as well<br>    list = getShotComments(1, 2, 15);<br>}<br><br>// get more comments<br></pre>
    <br>The current default for number of results per page is 15 per Dribbble API. Refer 
    <a href="http://dribbble.com/api">http://dribbble.com/api</a> for more details.
    <br>
    <br>
    <br>
    <h3>Project Links</h3>More details on the project can be found on project home page, 
    <a href="http://www.sangupta.com/projects/dribbble-java-client">http://www.sangupta.com/projects/dribbble-java-client</a>.
    <br>Source Code: 
    <a href="https://github.com/sangupta/dribbble-java-client">https://github.com/sangupta/dribbble-java-client</a>
    <br>Downloads: 
    <a href="https://github.com/sangupta/dribbble-java-client/downloads">https://github.com/sangupta/dribbble-java-client/downloads</a>
    <br>Issue Management: 
    <a href="https://github.com/sangupta/dribbble-java-client/issues">https://github.com/sangupta/dribbble-java-client/issues</a>
    <br>Usage Instructions: 
    <a href="https://github.com/sangupta/dribbble-java-client/blob/master/README.md">https://github.com/sangupta/dribbble-java-client/blob/master/README.md</a> 
    <br>
    <br>Hope this helps.
    <br>
    <br>
</div>
