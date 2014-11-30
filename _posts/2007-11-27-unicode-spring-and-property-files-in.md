---
layout: default
title: Unicode, Spring and Property files in Java
permalink: /2007/11/unicode-spring-and-property-files-in.html
redirect_from: "/2007/11/unicode-spring-and-property-files-in.html"
date: Tue Nov 27 12:15:00 IST 2007
sharingURL: http://blog.sangupta.com/2007/11/unicode-spring-and-property-files-in.html
tags: coding-techniques java
---
<b>Problem:</b>
<br>While executing a bean module using Spring, it throws up an Unicode 0xc invalid character exception.
<pre class="brush: xml">org.springframework.beans.factory.xml.XmlBeanDefinitionStoreException:<br>Line ** in XML document from ServletContext resource [/WEB-INF/spring/mymodule.xml] is invalid; <br>nested exception is org.xml.sax.SAXParseException: An invalid XML character (Unicode: 0xc) was found in the value of attribute "value".<br>Caused by: <br>org.xml.sax.SAXParseException: An invalid XML character (Unicode: 0xc) was found in the value of attribute "value".<br></pre>
<b>Background:</b>
<br>I was working on something in the office, which required me to write a simple bean using Spring DI (dependency injection). Not a big problem, and the code was complete in a day. I tested the code on my Windows machine and it worked fine. Perfect, I checked in the code, and was waiting for the build. After the build completion, I went ahead to test it on the QA machine. As soon as the module was executed, I got the mentioned error. Now this was something I wasn't expecting. The module executes perfectly fine in the DEV instance, then why this in QA.
<br>
<br>As always I searched for the exception thrown in Google, and almost all results I found indicated that there was some invalid character. The character 0xc in Unicode is meant for form feed. I checked the XML encoding and it was indeed UTF-8. I validated the XML for Unicode escaping and it came out with flying colors. The XML validated against the DTD. I opened the XML in a Hex Editor, and I could find no instance of a form feed in the file.
<br>
<br>Then what could have been the problem? Well, After a lot of struggle I realised that the line being pointed to referred to a property in the qa.properties file. I hard coded the value in mymodule.xml and it works fine.
<br>
<br>
<b>Reason:</b>
<br>The problem arises from the fact that the property files when created using Eclipse are ISO-8859-1 encoded, whereas the XML files are UTF-8 encoded. Hence, when Spring replaces the definition property from the properties file, it expects the value in the same encoding. This causes Spring to detect an invalid character (Form feed 0xc in my case) 
<i>This is particularly a problem of encoding and not of the invalid character.</i>
<br>
<br>
<b>Solution:</b>
<br>If you still haven't guessed it, make the property file adhere to the same encoding scheme as the Spring XML (UTF-8 in my case), or the crude way, hardcode the value in the XML file.
<br>
<br>Hope this helps.
