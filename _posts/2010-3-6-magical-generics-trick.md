---
layout: post
title: Magical Generics Trick
permalink: /tech/magical-generics-trick.html
redirect_from: "/2010/03/magical-generics-trick.html"
date: Sat Mar 06 11:49:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/03/magical-generics-trick.html
tags: coding-techniques java
---
Recently, I had to look back at some of the pieces I coded a few years back and found a generics trick I had forgotten. Thought of sharing with everyone.
<br>
<br>Most of the time when we are working with Dependency Injection, Caching, Helper methods etc, we are not aware of the type of object a method may return. Perfect examples to the same could be the use of 
<tt>HibernateTemplate</tt>, 
<tt>EHCache</tt>, 
<tt>ApplicationContext.getBean</tt>, and alike. What we do at such hour is simply, define the return type of the method as 
<tt>Object</tt> and then cast back to the required original such as,
<br>
<blockquote>
    <pre>public consume() {<br>    Object objct = myMethod(...);<br>    List list = (List) object;<br>    <br>}<br><br>public Object myMethod(arguments...) {<br><br>}</pre>
</blockquote>This approach induces some amount of boiler plate code. We always have to get an object and then cast it to the required type. In today's era, when you send it for code review, a surely comment is to check for the type before casting leading to some more boiler plate.
<br>
<br>Well, starting Java 5 there is this neat generics trick which you may employ to reduce all such boiler plate code. Consider an example where we want to pick up a bean from the 
<tt>ApplicationContext</tt> and return back.
<br>
<blockquote>
    <pre>public &lt;T&gt; T findBean(String beanName) {<br>    return this.applicationContext.getBean(beanName);<br>}</pre>
</blockquote>and that is it. To use the method just write,
<br>

```
 List list = getBean("listBean");
 ```
 or,
 ```
 CacheManager myCacheManager = getBean("cacheManager");
 ```

No more need to worry of boiler plate code or those unnecessary casts. Hope this helps you and me in remembering this! ;)
