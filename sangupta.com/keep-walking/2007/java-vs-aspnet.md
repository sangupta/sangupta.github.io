---
title: Java v/s ASP.NET
date: 21 Feb 2007
tags: 
- java
- just-like-that
alias:
- /tech/java-vs-aspnet.html
- /2007/02/java-vs-aspnet.html
---

Last week one of my office friends sent me a mail titled `100 reasons why Java is better than .NET`. 
Since birth I have been a person who tries to defy every theorem and logic. I debate on any topic 
from the side that is in minority ;) Gosh minority how minor they are. Anyway's, I always try and 
find out why is something as it is? Why not the other way?

<!-- break here -->

Coming back to the agenda, the past weekend I spent my time exploring through the features of ASP.NET. 
This was one territory I had never explored before. I had worked on a couple of .NET applications 
before, but never worked on a .NET web application. So here was the chance. I got ready to write a 
small application.

The application was to have a login functionality, a search functionality for the website, an access 
logging mechanism, a contact us page, and some other static pages. Another goal was to make use of 
templates. I had heard a lot about skinning and templating in .NET and thought of exploring.

I started with articles on MSDN. I would say they are a real wealth of knowledge, thoroughly written 
from an amateurs perspective and explain in detail. Finding a free IDE was not tough. I downloaded 
the Visual Web Developer Express (VWD Express) from the website itself.

Creating my first page was fast enough. Choose a new project as ASP.NET website. Open the default 
page, drag and drop all controls here and there and you are done. Adding a template was again swift. 
Just create a master page, drop all controls onto it like normal HTML code, and you are done. Added 
a content pane as a control onto the master page. Wow! that's pretty fast. Putting up template 
based website was so fast. Just 30 minutes flat! I remember using Tiles framework and writing those 
JSP's, took me a few hours.

Added some pages based on the master page. Quite fast again! But, website's are not meant to be static 
these days. How about a login page and the whole logic of user administration. MSDN again came to help. 
Just created a few pages with some drag and drop controls, and wow the functionality was there. Some 
nice and tidy XML configuration and it worked.

Adding a contact us page was easy again. Just a few drag and drop controls here and other. Double-click 
on the SUBMIT button just created, and the IDE opens up a coding window. The method is any plain method 
with just an added handler stating **handles Button1.Click**.Add your code to store the 
entered information and voilla that was easy again.

How about adding access logging. Here I had to search a bit, for every other website on Google talks 
about paid controls. So is it that tough... let's explore. After a good search, found a file called 
`Global.asax`. Seems to be a constants file for the website, but, found it to be the magical wonder.

`MSDN` came to the rescue again. Went straight to the Application_BeginRequest method and added the 
code. It was a plain 5 lines of code. Fetching information about the browser version, screen depth, 
resolution, JavaScript presence, CLR version, cookies etc. was too easy. Just read the property from 
the `Request` object.

Where to store the information. Text files are easy but they are not easy to generate reports from. 
How about an XML file? Microsoft has this task too simple again. An XML file may be treated as a 
stand-alone database, and adding rows to it is like calling a CRUD method using Hibernate. It was 
again a child's job.

I was onto my last goal for the day. It was just going to be lunch time. So will I be able to complete 
it so soon. But, <em>It is easier said than done.</em> After, so much drag and drop I though that there 
would be a way to do this too. Searched MSDN, searched Google. But the only thing I find out was some 
paid controls that could have done the job. Every now and then I was being reminded of the Apache project, 
which serves as a one-stop shop for all Java programming needs. Was there an <strong>Apache</strong> sort 
of thing for .NET too?

Hunger was on my mind, so went in to lunch. And when you MOM cooks the food, it tasted good. And when 
it tastes good, you eat a lot more. So here was I, after eating a good supper, was on my bed.. with a 
quilt over me... resting in peace... for the next 3 hours. What a pleasure sleeping after a good meal. :-)

In the evening finishing up the task was now a challenge. Searched for the next one hour, but, could 
not find an easy solution for search. Then I thought of a port of the famous `LUCENE` search 
engine, and to my surprise, Apache itself has ported the lucene engine to .NET called `dotlucene`. 
That was fabulous. Integrating it with my project was just pasting a DLL file in a folder. With the 
available example, adding a search box was a matter of another couple of drag and drops. Building the 
search index is an altogether different story for some time else.

Anyway's I was ready with my first .NET website. In a flat four hours time, I had accomplished the task. 
A website with user authentication, search, contact us and access logging.

Is this the end? No, as I said I am a born debater. Will need to explore more... but, for now need to go to sleep. 

For tomorrow it is office again :-)