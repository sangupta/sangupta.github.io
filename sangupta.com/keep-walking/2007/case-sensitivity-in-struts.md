---
title: Case-sensitivity in Struts
date: 01 Nov 2007
tags: 
- coding-techniques
- java
alias:
- /tech/case-sensitivity-in-struts.html
- /2007/11/case-sensitivity-in-struts.html
---

While cleaning up my Thunderbird today, I came across this issue which kept me (and 
my team) on toes for a few days. It is an old issue (almost an year now) which I pen 
down due to some fond memories. The problem is related to J2EE Web Application project. 
The project background is not needed to relate to the problem.

<!-- break here -->

The application was using Struts 1.1 and was deployed in Weblogic 8.1 SP1. The problem 
occurred while I was deploying my WAR (in the exploded form) after modification of 
`struts-config.xml`, and not when I was deploying the complete WAR as a whole. I had 
used many struts validators and parsers, but none reported the error. The exception 
received was,

```
<Oct 10, 2006 3:51:04 PM GMT+05:30> <Error> <HTTP> <BEA-101216> <Servlet:"action" failed to preload on startup in Web application: "myApp".
javax.servlet.UnavailableException: Parsing error processing resource path
at org.apache.struts.action.ActionServlet.handleConfigException(ActionServlet.java:1035)
at org.apache.struts.action.ActionServlet.parseModuleConfigFile(ActionServlet.java:1014)
at org.apache.struts.action.ActionServlet.initModuleConfig(ActionServlet.java:955)
at org.apache.struts.action.ActionServlet.init(ActionServlet.java:470)
at javax.servlet.GenericServlet.init(GenericServlet.java:258)
at com.myapp.controller.servlet.MyFrontControllerServlet.init(MyFrontControllerServlet.java:91)
at weblogic.servlet.internal.ServletStubImpl$ServletInitAction.run(ServletStubImpl.java:1070)
at weblogic.security.acl.internal.AuthenticatedSubject.doAs(AuthenticatedSubject.java:317)
at weblogic.security.service.SecurityManager.runAs(SecurityManager.java:118)
at weblogic.servlet.internal.ServletStubImpl.createServlet(ServletStubImpl.java:893)
at weblogic.servlet.internal.ServletStubImpl.createInstances(ServletStubImpl.java:842)
at weblogic.servlet.internal.ServletStubImpl.prepareServlet(ServletStubImpl.java:782)
at weblogic.servlet.internal.WebAppServletContext.preloadServlet(WebAppServletContext.java:3236)
at weblogic.servlet.internal.WebAppServletContext.preloadServlets(WebAppServletContext.java:3181)
at weblogic.servlet.internal.WebAppServletContext.preloadResources(WebAppServletContext.java:3154)
at weblogic.servlet.internal.WebAppServletContext.setStarted(WebAppServletContext.java:5637)
at weblogic.servlet.internal.WebAppModule.start(WebAppModule.java:866)
at weblogic.j2ee.J2EEApplicationContainer.start(J2EEApplicationContainer.java:2017)
at weblogic.j2ee.J2EEApplicationContainer.activate(J2EEApplicationContainer.java:2058)
at weblogic.management.deploy.slave.SlaveDeployer$ComponentActivateTask.activateContainer(SlaveDeployer.java:2624)
at weblogic.management.deploy.slave.SlaveDeployer$ActivateTask.doCommit(SlaveDeployer.java:2547)
at weblogic.management.deploy.slave.SlaveDeployer$Task.commit(SlaveDeployer.java:2349)
at weblogic.management.deploy.slave.SlaveDeployer$Task.checkAutoCommit(SlaveDeployer.java:2431)
at weblogic.management.deploy.slave.SlaveDeployer$Task.prepare(SlaveDeployer.java:2343)
at weblogic.management.deploy.slave.SlaveDeployer$ActivateTask.prepare(SlaveDeployer.java:2511)
at weblogic.management.deploy.slave.SlaveDeployer.processPrepareTask(SlaveDeployer.java:833)
at weblogic.management.deploy.slave.SlaveDeployer.prepareDelta(SlaveDeployer.java:542)
at weblogic.management.deploy.slave.SlaveDeployer.prepareUpdate(SlaveDeployer.java:500)
at weblogic.drs.internal.SlaveCallbackHandler$1.execute(SlaveCallbackHandler.java:25)
at weblogic.kernel.ExecuteThread.execute(ExecuteThread.java:197)
at weblogic.kernel.ExecuteThread.run(ExecuteThread.java:170)
```

A lot of discussions over the validity of XML and it being well formed happened. A few 
interesting notes worth remembering were,

* Maybe some kind of file-locking occurs? How do you make a deploy? Just copy war's content into 
app's directory? Maybe this is the case, weblogic keeps reference to old `struts-config.xml` or 
something like that. When deploying as a war file, weblogic just removes old directory, creates 
a new one and no file-locking occurs.
    
* guessing that there is a problem with the XML parser.For example (warning: this is a shot in 
the dark) I had problems with Java 1.4.x because it uses the `crimson` parser, that is very 
buggy. Once I used the Xerces parser everything went fine...

The root cause of the problem was the case-sensitive declaration of the entries in a `struts-config.xml`
file. There was a letter in the name of the folder misspelt in upper case. The compilation of class
did not fail being a Windows machine, and the JDK compiler could not distinguish the mismatch in 
package name and the tree structure. But when JVM tried to load the class, it failed.


**If the package name does not match the directory structure (in case) then the above error is thrown.**
I am still confused as to why Weblogic throws it as a parsing error?


You can follow the actual conversation on the struts-user mailing group, or its web interface 
<a href="http://servlets.com/archive/servlet/ReadMsg?msgId=674536&amp;listName=struts-user">here</a>.