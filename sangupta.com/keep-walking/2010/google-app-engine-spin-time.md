---
title: Google App Engine Spin Time
date: 31 Mar 2010
tags: 
- coding-techniques
- java
- my-projects
alias:
- /tech/google-app-engine-spin-time.html
- /2010/03/google-app-engine-spin-time.html
---

Google App Engine, the cloud offering from Google, has this nice feature of spinning 
down an instance when there are no more instances to be served for a given application. 
Thus, say an app X does not receive a request in some time (haven't found anything on 
how this time is arrived at), the JVM instance for the application is spinned down 
(brought down). The term 'spin down' seems to have been borrowed from the computer 
hard-disks that do the same to save energy. With comments all over it seems JVM instances 
have been brought down with even one minute of inactivity :(

<!-- break here -->

Essentially spinning down is a boon for the environment and to the concept of elasticity. 
First, it reduces CO2 emission by reducing the power consumption. Second, the less the 
number of warm instances available, less the number of machines required. Third, applications 
that need to serve more load can scale up easily on the same nodes, that were earlier 
serving some now-dormant application.

This feature gives some hard time for small-application developers like me, who don't 
get a lot of traffic on their website. Once the instance has been spinned down, it takes 
a while to come back. For some numbers, cold starting a JVM itself seems to be taking 
almost 6-7 seconds on GAE. In case you use Spring DI, Spring MVC, JDO it all adds to 
the startup time. Usage of JSPs itself adds a second or two to the load time, apart 
from adding roughly 8 JARs (2 MBs) to the payload. Evenstar took almost 15-18 seconds 
to warm up. This leaves a client request only 12 seconds to serve considering the 
30-second timeout imposed by GAE on user requests.

Some methods that have been described to bring down this warm up time include, doing 
away with the use of Spring DI, Spring MVC and JDO. For small applications this might 
make sense but may cause nightmare to maintain larger ones. You may write your own light 
eight MVC wrapper or use libraries like 
<a href="http://sites.google.com/site/slim3appengine/Home">Slim3</a>. 

* Another recommendation is to get away with using JSPs. This seems to be the toughest part, as writing 
`servlet` code to process request would bump-up development time by magnitude. 

* A still-acceptable recommendation is to keep the first request (usually the home page) 
JSP free, thus bringing down the warm-up time. 

* Third, clean up your `lib` folder of any JAR that you may not be using. Loading them unnecessarily 
at startup adds time. 

* Fourth, don't use JDO, switch to light-weight wrappers like <a href="http://code.google.com/p/objectify-appengine/">Objectify</a>, 
<a href="http://code.google.com/p/simpleds/">SimpleDS</a> or <a href="http://sites.google.com/site/slim3appengine/Home">Slim3</a>. Yes, Slim3 also doubles up as a datastore framework.

The official <a href="http://code.google.com/appengine/docs/roadmap.html">GAE roadmap 
page</a> now indicates the following feature on deck, _Ability to reserve instances to 
reduce application loading overhead_. This would mean that a user would have choice 
to ask Google to keep a few instances warm, to be always ready to serve requests. Hopefully, 
this should be a paid service as it will incur some extra cost. And hence, developers like 
me are stranded out.

A downside to this approach is the hard-time when an instance is already overloaded 
with requests and the load balancer needs to start a new instance of the application. 
In a sense this would mean that hard-times are experiences whenever load increases 
invariably. A thread on <a href="http://groups.google.com/group/google-appengine">Google 
App Engine Google Group</a> seem to have recommended to use snapshot mechanism before 
bringing down the JVM to reduce the hard-times. Thus, a memory snapshot of container is 
taken and stored, the container brought down, then when needed, the entire memory snapshot 
restored. This will considerably improve the startup time for GAE based websites. This 
functionality is analogous to the `Hibernate` functionality offered on Windows machines.

One way to prevent the instances going cold, is to add jobs to the `Task Queue` that will 
ping your application once every 1 minute. This only adds 1440 calls per day to your 
application. For a low traffic website that number will keep the website well under the 
GAE/J limit. A simple POC did work for me, atleast.

I have been experiencing quite a lot of spin down times on my blog 
<a href="http://www.poetinside.com/">PoetInside</a> which was (earlier) powered by 
<a href="http://myjerry.org/evenstar">Evenstar</a>, the blog engine on GAE/J. Due to 
regular spin downs, many of my visitors were receiving an HTTP 404. Now this translates 
for me is to re-write the whole code again taking in care of the Google App Engine spin 
down times. As that would involve some extra time, Evenstar is now a distant star for me.

Wish me luck, folks!