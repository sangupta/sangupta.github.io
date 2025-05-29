---
title: Introducing as3dribbble - ActionScript Client Library for Dribbble.com
date: 28 Apr 2012
tags: 
- actionscript
- adobe-air
- my-projects
alias:
- /tech/introducing-as3dribbble-actionscript.html
- /2012/04/introducing-as3dribbble-actionscript.html
---

I am happy to announce the availability of `as3dribbble`, an ActionScript client
library for working with <a href="http://dribbble.com/">Dribbble.com</a> APIs. The
library is strongly-typed, pagination-aware, and rate-limit aware for accessing all
the current APIs. The library also exposes a convenience class called `DribbbleInvoker`
that may be used to add more APIs (should they get added in future and this library
looses track). The invoker is rate-limit safe.
<!-- break here -->

## Usage

A simple example to use is as under,

```actionscript
private function getShotDetails():void {
  var client:DribbbleClient = new DribbbleClient();
  // the requestID can then be used to check which request failed
  var requestID:uint = client.getShot(12, showShot, errorHandler);
}

private function showShot(shot:Shot):void {
  trace('received shot details: ' + shot);
}

private function errorHandler(id:uint):void {
  // error occured when fetching shot details
}
```

## Pagination Support

All API methods that support pagination have a corresponding, pagination-aware method
available as well. For example, when fetching comments for a shot you may do,
    <br>
    <br>
    <pre class="brush: as3">var client:DribbbleClient = new DribbbleClient();<br><br>private function getShotComments():void {<br>    var requestID:uint = client.getShotComments(123, showComments, errorHandler);<br>}<br><br>private function showComments(list:CommentList):void {<br>    // do something with these comments<br><br>    var requestID:uint;<br><br>    // check for more comments<br>    if(list.getPage() &lt; list.getPages()) {<br>        // fetch results from page 2<br>        requestID = client.getShotComments(1, showComments, errorHandler, 2);<br><br>        // or, may provide the number of results to fetch as well<br>        // fetch results from page 2, with 15 results per page<br>        requestID = getShotComments(1, showComments, errorHandler, 2, 15);<br>    }<br>}<br></pre>The current default for number of results per page is 15 per Dribbble API. Refer
    <a href="http://dribbble.com/api">http://dribbble.com/api</a> for more details.
    <br>
    <h3>Rate-Limiting and Exceptions</h3>By default, the
    <tt>DribbbleClient</tt> will throw a
    <tt>DribbbleApiRateLimitException</tt> run-time error when the request rate goes over the board. This makes sure that your client does not need to catch unnecessary exceptions during invocation. In case you wish, you may catch this exception and delay the request to a future time as,
    <br>
    <pre class="brush: as3">private function getShot():void {<br>    var shot:Shot = null;<br>    var shotID:uint = 1;<br><br>    try {<br>        var requestID:uint = client.getShot(shotID, showShot, errorHandler);<br>    } catch(e:DribbbleApiRateLimitException) {<br>        // wait for a minute<br>        setTimeOut(getShot, 1000 * 60); // call again after a minute<br>    }<br>}<br></pre>If you wish to prevent the code from throwing the
    <tt>DribbbleApiRateLimitException</tt> exception, you can do so when creating the client.
    <br>
    <pre class="brush: as3">var client:DribbbleClient = new DribbbleClient(false);<br></pre>Any invocations on this client, will not throw the error, but return a
    <tt>null</tt> back as the result to the completion handler you specified.
    <br>
    <br>
    <h3>Dependencies</h3>The library does not depend on any third-party libraries and is self-contained. The library has been compiled and tested using Adobe Flex 4.6/Adobe AIR 3.0.
    <br>
    <br>
    <h3>Project Links</h3>More details on the project can be found on project home page,
    <a href="http://www.sangupta.com/projects/as3dribbble">http://www.sangupta.com/projects/as3dribbble</a>.
    <br>Source Code:
    <a href="https://github.com/sangupta/as3dribbble">https://github.com/sangupta/as3dribbble</a>
    <br>Downloads:
    <a href="https://github.com/sangupta/as3dribbble/downloads">https://github.com/sangupta/as3dribbble/downloads</a>
    <br>Issue Management:
    <a href="https://github.com/sangupta/as3dribbble/issues">https://github.com/sangupta/as3dribbble/issues</a>
    <br>Usage Instructions:
    <a href="https://github.com/sangupta/as3dribbble/blob/master/README.md">https://github.com/sangupta/as3dribbble/blob/master/README.md</a>
    <br>
    <br>Keep Dribbbling!