---
title: Unicode, Spring and Property files in Java
date: 27 Nov 2007
tags: 
- coding-techniques
- java
alias:
- /tech/unicode-spring-and-property-files-in.html
- /2007/11/unicode-spring-and-property-files-in.html
---

Problem
-------

While executing a bean module using Spring, it throws up an Unicode 0xc invalid character exception.

```
org.springframework.beans.factory.xml.XmlBeanDefinitionStoreException:
Line ** in XML document from ServletContext resource [/WEB-INF/spring/mymodule.xml] is invalid; 
nested exception is org.xml.sax.SAXParseException: An invalid XML character (Unicode: 0xc) was found in the value of attribute "value".
Caused by: 
org.xml.sax.SAXParseException: An invalid XML character (Unicode: 0xc) was found in the value of attribute "value".
```

Background
----------

I was working on something in the office, which required me to write a simple bean using Spring 
DI (dependency injection). Not a big problem, and the code was complete in a day. I tested the 
code on my Windows machine and it worked fine. Perfect, I checked in the code, and was waiting 
for the build. After the build completion, I went ahead to test it on the QA machine. As soon as 
the module was executed, I got the mentioned error. Now this was something I wasn't expecting. 
The module executes perfectly fine in the DEV instance, then why this in QA.

As always I searched for the exception thrown in Google, and almost all results I found indicated 
that there was some invalid character. The character 0xc in Unicode is meant for form feed. I c
hecked the XML encoding and it was indeed UTF-8. I validated the XML for Unicode escaping and it 
came out with flying colors. The XML validated against the DTD. I opened the XML in a Hex Editor, 
and I could find no instance of a form feed in the file.

Then what could have been the problem? Well, After a lot of struggle I realised that the line 
being pointed to referred to a property in the qa.properties file. I hard coded the value in 
`mymodule.xml` and it works fine.

Reason
------

The problem arises from the fact that the property files when created using Eclipse are `ISO-8859-1`
encoded, whereas the XML files are UTF-8 encoded. Hence, when Spring replaces the definition property 
from the properties file, it expects the value in the same encoding. This causes Spring to detect 
an invalid character (Form feed 0xc in my case) 
_This is particularly a problem of encoding and not of the invalid character._

Solution
--------

If you still haven't guessed it, make the property file adhere to the same encoding scheme as the 
Spring XML (UTF-8 in my case), or the crude way, hardcode the value in the XML file.

Hope this helps.