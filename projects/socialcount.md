---
layout: project
title: Social Count
github: socialcount
maven: true
---

`socialcount` is a simple JAVA library to fetch various social like/share/comment counts for a 
given URL. This helps in analyzing the current outreach of a given URL.

The following social media providers are currently integrated:

* Facebook likes, shares, comments and clicks
* Twitter tweets
* Google Plus ones and shares
* Pinterest pins
* LinkedIn shares

### Usage

The library can be used in two ways:

* As a standalone command-line application
* As an embedded library

#### Standalone App Usage

To run the command line version execute the following shelll command,

```
$ java -jar socialcount-1.0.0.jar
```

The console will keep reading URLs from console via user input, and will push out the metrics. To
stop checking more URLs, simply return an empty URL.

One may also check URLs directly from command line as:

```
$ java -jar socialcount-1.0.0.jar http://facebook.com
```

#### Library usage

Using the library is pretty easy, as under,

```java
String url = "http://facebook.com";
SocialCounts counts = SocialCountClient.getSocialCounts(url);

System.out.println("Facebook shares: " + counts.facebookShares);
```

The above example runs through each provider one by one, and thus may be slow in retrieving the 
sought information. The following example also shows the usage of a **parallelized** fetch from
all these providers.

```java
String url = "http://facebook.com";
SocialCounts counts = SocialCountClient.getSocialCountsParallel(url);

System.out.println("Facebook shares: " + counts.facebookShares);
```

This would be much faster than the previous, but will make use of parallel threads and may increase
the load on the system a bit.

If you just want to fetch some specific counts, it is possible as,

```java
String url = "http://facebook.com";
SocialCounts counts = new SocialCounts(url);

// fetch only twitter and facebook metrics
SocialCountClient.getTwitterCount(counts);
SocialCountClient.getFacebookCount(counts);

// only done to measure timing - no other significance
counts.markComplete();
```

Or better still, just configure the providers you want to run and the library takes care of the rest:

```java
String url = "http://facebook.com";

// the config object can be reused as many times as want and is thread-safe
SocialCountConfig config = new SocialCountConfig();
config.twitter = true; // can be skipped as by default everything is true
config.facebook = true; // can be skipped as by default everything is true
config.googlePlusOne = false;
config.googleShares = false; // this one takes a lot of time
config.linkedin = false;
config.pinterest = false;

counts = SocialCountClient.getSocialCounts(url, config);

// or run the parallelized version
// counts = SocialCountClient.getSocialCountsParallel(url, config);
```

### License

The library is released under the terms of **Apache Public License Version 2**.
