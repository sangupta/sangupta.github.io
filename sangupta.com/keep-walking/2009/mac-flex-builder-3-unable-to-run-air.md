---
title: (Mac) Flex Builder 3 unable to run AIR applications
date: 24 Nov 2009
tags: 
- adobe-air
- workarounds
alias:
- /tech/mac-flex-builder-3-unable-to-run-air.html
- /2009/11/mac-flex-builder-3-unable-to-run-air.html
---

If you are using a Mac and running Flex Builder 3 to develop AIR applications 
on AIR 1.5 runtime, you may encounter an issue where Flex Builder simply refuses 
to debug/run the AIR application giving you the following popup,

<!-- break here -->

> Process terminated without establishing connection to debugger. If the program 
> is already running, close it before attempting to debug.

Most of the solutions you would find via Google, would ask you to change the AIR 
application descriptor to point to 1.5 namespace. Well, this is one of the biggest 
reasons for this problem. But another small bug may lead to this occurrence. For 
details on the same refer to 
<a href="http://bugs.adobe.com/jira/browse/SDK-19707">http://bugs.adobe.com/jira/browse/SDK-19707</a>

Fixing the bug is too easy,

* Download the file change.sh from the <a href="http://bugs.adobe.com/jira/browse/SDK-19707">Bug Database</a>

* Copy this file change.sh into the SDK parent folder. On a typical installation 
on Mac, it would resemble `/Applications/Adobe Flex Builder 3/sdks/3.4.0`

* Adjust the file permissions to 755 using `chmod 755 change.sh`

* Execute the script `./change.sh`

* Open your Flex Builder, open the project, run your AIR app and have fun!


Hope this helps!