---
title: Java deprecated on Mac OS X
date: 23 Oct 2010
tags: 
- java
alias:
- /tech/java-deprecated-on-mac-os-x.html
- /2010/10/java-deprecated-on-mac-os-x.html
---

A few days back, Apple 
<a href="http://developer.apple.com/library/mac/#releasenotes/Java/JavaSnowLeopardUpdate3LeopardUpdate8RN/NewandNoteworthy/NewandNoteworthy.html%23//apple_ref/doc/uid/TP40010380-CH4-SW1">announced</a> that they are 
deprecating Java on the Mac OS X operating system.The Mac App Store review 
guidelines, Section 2.24 mentions,

<!-- break here -->

> apps that use deprecated or optionally installed technologies will be rejected.

This essentially translates that no Java application would hit the Mac App Store. 
Is this it? I don’t think so. As per various posts flooding over blogs/twitter, there 
seems to be a little discomfort in the community about the announcement. Steve Jobs 
quoted in favor of this decision as,

> Sun (now Oracle) supplies Java for all other platforms. They have their own release 
> schedules, which are almost always different than ours, so the Java we ship is always 
> a version behind. This may not be the best way to do it.

As James Gosling mentions in his 
<a href="http://nighthacks.com/roller/jag/entry/steve_jobs_comments_on_apple">blog post</a> 
that it is not Sun providing Java for all other platforms. The platform developers are the 
ones doing so. This argument does not make much difference in this context. As users are 
still free to install any JVM that supports for Mac OS X, the world of Java would still be 
available on Mac. This would make sure that Java developers can continue to develop their 
applications independent of the platform, and others can continue to use them. The only 
setback to the developers is that their application can not be posted to Mac Store.

In the last paragraph of his post, Gosling also mentions how Oracle forced Apple to implement 
aliased rendering in Mac, which as per Mac standards was awful to implement. With Oracle coming 
in conflict with many other Java enthusiasts such as, Apache and Google, it could be well 
timed for Apple to pay back to Oracle in its own way.

Is it only Java at which Apple would stop, or will Python, Perl, PHP, Ruby, etc.. be the next 
ones in line of fire. Do note that Google is also enthusiastic about Python. And none, of these 
have their schedules parallel to Apple schedules.

It would be interesting to see how the Java world shapes up, considering other recent developments such as,

* Oracle suing Google over patent infringement – read more with this <a href="http://www.google.com/search?sourceid=chrome&amp;ie=UTF-8&amp;q=oracle+sues+google">search</a>

* Schedule and release change in Java 7 – read details on Mark Reinhold’s <a href="http://blogs.sun.com/mr/entry/plan_b">blog post</a> (Mark is Chief Architect of Java Platform Group at Oracle)

* Too much noise in the recent JCP elections – read Stephen Colebourne’s <a href="http://www.jroller.com/scolebourne/entry/stacking_the_jcp_election">blog post</a>

<br>Hoping to see that silver lining to this dark cloud.