---
title: 101 Reasons - My Take - Part 1
date: 27 Feb 2007
tags: 
- java
- just-like-that
alias:
- /tech/101-reasons-my-take-part-1.html
- /2007/02/101-reasons-my-take-part-1.html
---

I devoted much of the time today reading a lot of stuff about the various points stated in the above said article. Here is what I could find and gather up. So here I come.

<!-- break here -->

<p><span style="color:#ff8000;">REASON 1:</span> <a href="http://www.manageability.org/manageabilityWiki/PublicDomainAPIs">Public Domain API's</a> - Any Java public API are part of the public domain, .NET apis are proprietary and can open the door to a law suit.<br><br><span style="color:#ff8000;">MY TAKE:</span> It appears partly true to me. There are many APIs of JAVA that are not complete open-source. Yes, Microsoft definitely has not released the source code to the .NET framework, but its counterpart <a href="http://www.mono-project.com/Main_Page">MONO</a> is a fair good implementation of the framework. </p> 
<p>But, does it really concerns a developer. How many of us have actually checked the code of the API or have needed to check it out for our own projects? Hardly anyone.</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 2:</span> <a href="http://www.manageability.org/manageabilityWiki/StandardLibrarySourceCodeAvailability">Standard Library Source Code Availability</a> - Java source code for the core libraries are available in every J2SDK distribution, .NET sources can only be seen by resorting to illegal means. </p> 
<p><span style="color:#ff8000;"></span><span style="color:#ff8000;">MY TAKE:</span> Its just another representation of the point above. Beating round the bush. Old saying goes good here.</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 3:</span> <a href="http://www.manageability.org/manageabilityWiki/DotNetPurityIsAMyth">dotNet Purity Is A Myth</a> - Java promotes 100% pure Java libraries, for .NET purity is nothing more than a myth.</p> 
<p><span style="color:#ff8000;"></span><span style="color:#ff8000;">MY TAKE:</span> As Java supports for 100% pure Java libraries, .NET supports for 100% pure managed code libraries, as .NET supports multiple languages. .NET supports unmanaged code, but so does Java supports native library calls. In fact, the possibility of mixing managed and unmanaged code, itself provides superior advantages while working with GUI threads.</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 4:</span> <a href="http://www.manageability.org/manageabilityWiki/75OfEnterpriseSoftwareDevelopment">75% Of Enterprise Software Development</a> - Avoid becoming one of the 25% of "use-less" employees.</p> 
<p><span style="color:#ff8000;"></span><span style="color:#ff8000;">MY TAKE:</span> I am not sure about the %age for I could not retrieve the statistics over the Internet. But still, if we take it to be true, then Java has been around for many many years. .NET has been a new entrant, yet it has created 25% market. So it goes on to show that .NET has gaining acceptance.</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 5:</span> <a href="http://www.manageability.org/manageabilityWiki/PreferredPlatformForImplementingWebServices">Preferred Platform for Implementing WebServices</a> - Despite billions spent by Microsoft in marketing, surveys continue to reveal that Java is the preferred platform when it comes to Web Services.</p> 
<p><span style="color:#ff8000;"></span><span style="color:#ff8000;">MY TAKE: </span>The W3C defines a <b>Web service</b> as a software system designed to support interoperable Machine to Machine interaction over a network. Web services are frequently just Web APIs that can be accessed over a network, such as the Internet, and executed on a remote system hosting the requested services.</p> 
<p>Usage of WebServices is not dependent on any particular language, meaning you can access WebServices of Java from .NET and vice-versa. With regard to preferred platform, I could not find a single reference to this fact (maybe Google doesn't indexes all pages). Still, developing a WebServices is much easier in .NET than in Java (personal experience). This <a href="http://www.webservicesarchitect.com/content/articles/hanson01.asp">article on webservicesarchitect.com</a> reads something else: "The key advantage, perhaps, of using the .NET approach to Web Services is that it has been designed for that purpose, whereas J2EE is being retrofitted by the addition of further APIs.". Hope this clears some ambiguities.</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 6:</span> <a href="http://www.manageability.org/manageabilityWiki/SuperiorPlatformForWebDevelopment">Superior Platform for Web Development</a> - <a href="http://asp.net/">ASP.NET</a> is a poorly designed and crippled framework as compared to the richness of frameworks found in Java.</p> 
<p><span style="color:#ff8000;">MY TAKE: </span>This is a highly understated statement. ASP.NET is built over MVC-2 architecture and provides the same natively using code-behind model. The binding of controls to client's action (such as click of a button) provides a very fast learning and implementation process. Control binding to data sources provides easy pre-population of controls with values from various data-sources. Mounting of XML file as a database and means of executing queries on it provide a very cheap way of site development, where expensive data-bases can be dispensed with. Random tests done by many claim upto 10 times performance improvement over J2EE. ASP.NET automatically recovers from memory leaks and errors. The multiple programming language support (for more than 30) will ensure that you need not learn a new language to develop websites.</p> 
<p>This is also reflected by the fact that the prestigious <a href="http://mit.edu/aboutmit/">massachusetts institute of technology</a> (MIT) itself chose ASP.NET over J2EE platform for its portal. Also, the advent of XAML will make sure that you need to design your GUI only once, whether for a desktop app or a web app.</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 7:</span> <a href="http://www.manageability.org/manageabilityWiki/WriteStoredProceduresUsingJava">Write Stored Procedures using Java</a> - Most relational databases support writing of stored procedures in the Java language. There has yet to be a production release of a database that supports any .NET languages.</p> 
<p><span style="color:#ff8000;">MY TAKE: </span>The stored procedure concept is supported using ADO.NET, a part of .NET framework. Writing stored procedures in Java language appears to be a vague concept, for stored procedures are nothing else but "A stored procedure is a group of SQL statements that form a logical unit and perform a particular task." as explained in a tutorial by SUN itself (<a href="http://java.sun.com/docs/books/tutorial/jdbc/basics/storedprocedures.html">see here</a>).</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 8:</span> <a href="http://www.manageability.org/manageabilityWiki/AnAbundanceOfExperiencedPractitioners">An Abundance of Experienced Practitioners</a> - Nobody seems to know how to write .NET programs well and that's giving .NET a bad name! A pretty lame excuse I must say! : Are you talking of yourself.</p> 
<p><span style="color:#ff8000;">MY TAKE: </span>Visual Basic language has been around much before Java came. C++ has been there for many decades now. Both support the .NET platform, so how can one say that there seems to be a scarcity of experience. Infact, even Java is supported on .NET platform, so you can bring those experienced practitioners here to increase the pool size.</p> 
<p> </p> 
<p><span style="color:#ff8000;">REASON 9:</span> <a href="http://www.manageability.org/manageabilityWiki/SupportiveOpenSourceCommunities">Supportive Open Source Communities</a> - Open Source communities that support distributed development are a plenty in the Java world. </p> 
<p><span style="color:#ff8000;">MY TAKE: </span>There are many Open-Source communities for .NET too. Just check <a href="http://www.codeplex.com/">Codeplex</a>, <a href="http://www.gotdotnet.com/">GotDotNet</a>, <a href="http://www.codeproject.com/">CodeProject</a> to name a few. Infact, the MSDN library itself is so much descriptive and detailed in every topic that it zeroes in on the need for any other .NET documentation. With plenty of examples one doesn't need to have look for another source.</p> 
<p><span style="color:#ff8000;"></span> </p> 
<p><span style="color:#ff8000;">REASON 10:</span> <a href="http://www.manageability.org/manageabilityWiki/ProvenSecurity">Proven Security</a> - 2 Years after <code>Trust Worthy</code> initiative is launched and we collectively lose $55 billion last year.</p> 
<p><span style="color:#ff8000;">MY TAKE: </span>Taking security for discussion is par my-knowledge. There are so many articles on net that deciding on the security advantages of one over another is really difficult for me. But still, this $55 billion loss thing, neither I could find a reference nor I could digest.</p> 
<p> </p> 
<p>I will take a break here, and will continue some time else. Need to go do some work. Till then, why don't you people ponder yourself and think if these are valuable arguments. For there is much more to come.</p>