---
title: Magical Generics Trick
date: 06 Mar 2010
tags: 
- coding-techniques
- java
alias:
- /tech/magical-generics-trick.html
- /2010/03/magical-generics-trick.html
---

Recently, I had to look back at some of the pieces I coded a few years back and 
found a generics trick I had forgotten. Thought of sharing with everyone.

Most of the time when we are working with Dependency Injection, Caching, Helper 
methods etc, we are not aware of the type of object a method may return. Perfect 
examples to the same could be the use of `HibernateTemplate`, `EHCache`, 
`ApplicationContext.getBean`, and alike. What we do at such hour is simply, define 
the return type of the method as `Object` and then cast back to the required original such as,

<!-- break here -->


```java
public consume() {
	Object objct = myMethod(...);
	List list = (List) object;
}

public Object myMethod(arguments...) {
	// some code
}
```

This approach induces some amount of boiler plate code. We always have to get an 
object and then cast it to the required type. In today's era, when you send it for 
code review, a surely comment is to check for the type before casting leading to 
some more boiler plate.

Well, starting Java 5 there is this neat generics trick which you may employ to 
reduce all such boiler plate code. Consider an example where we want to pick up 
a bean from the `ApplicationContext` and return back.

```java
public <T> T findBean(String beanName) {
	return this.applicationContext.getBean(beanName);
}
```

and that is it. To use the method just write,

```
 List list = getBean("listBean");
 ```
 or,
 ```
 CacheManager myCacheManager = getBean("cacheManager");
 ```

No more need to worry of boiler plate code or those unnecessary casts. Hope this helps you and me in remembering this! ;)