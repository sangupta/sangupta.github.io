---
title: Songs Downloader
date: 13 Jun 2013
tags: 
- coding-techniques
- java
- just-like-that
- my-projects
alias:
- /tech/songs-downloader.html
- /2013/06/songs-downloader.html
---

Today, it was the first glimpse of <a href="http://en.wikipedia.org/wiki/Monsoon">monsoon</a> showers in 
Delhi. Today, also marks 11 months since the time I last blogged. It's not that I haven't been coding, but 
my efforts were concentrated to ship many small or large applications both at work and personally. As 
the weather changes today, even I change my course today and come back to the blogging world.

<!-- break here -->

As the first thing I did today, was work on a sample application that allows you to download media files from 
<a href="http://songspk.name/">Songs.PK</a> site via the command line. The application was a hands-on in using 
<a href="http://jsoup.org/">JSoup HTML parsing library</a> to see if we can find data inside HTML files. Completely 
written in Java, the application can run on almost all major platforms including Windows, Mac OS X, Linux and Solaris.

Downloading a song only requires one to know the first few initial characters. Once entered, the user is presented 
with a list of all movie titles available that start with the same initials. The user can choose one title from 
amongst the list, which will then download all songs from the album on to the local disk. The files are grouped 
by album name, and the files stored with name as it appears in the HTML page. If the files have already been 
downloaded, the application will skip downloading them.

Also, in case something fails and there is a possibility of downloading the media with a RETRY, the application 
will say so on the console. You may download the application from 
<a href="http://static.sangupta.com/downloads/songs-downloader.jar">http://static.sangupta.com/downloads/songs-downloader.jar</a>.

As always, the code for the application is <a href="http://en.wikipedia.org/wiki/Open_source">open-source</a>, and 
available on my GitHub page at <a href="https://github.com/sangupta/songs">https://github.com/sangupta/songs</a>. The 
code is licensed under the academic <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License Version 2</a>.

**Disclaimer/Warning:** The application is not meant to download media files for piracy. The application usage 
is only meant to learn how to use JSoup library along with the Jerry framework to simulate user behaviour on 
the internet. Downloading and/or using the application, the author of the application is absolved of any risk, 
damage, or any consequence thereof. The user does so at their own risk.