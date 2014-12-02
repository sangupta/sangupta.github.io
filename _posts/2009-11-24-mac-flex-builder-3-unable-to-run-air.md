---
layout: post
title: (Mac) Flex Builder 3 unable to run AIR applications
permalink: /tech/mac-flex-builder-3-unable-to-run-air.html
redirect_from: "/2009/11/mac-flex-builder-3-unable-to-run-air.html"
date: Tue Nov 24 19:48:00 IST 2009
sharingURL: http://blog.sangupta.com/2009/11/mac-flex-builder-3-unable-to-run-air.html
tags: adobe-air workarounds
---
<div align="justify">
    If you are using a Mac and running Flex Builder 3 to develop AIR applications on AIR 1.5 runtime, you may encounter an issue where Flex Builder simply refuses to debug/run the AIR application giving you the following popup,
    <br>"Process terminated without establishing connection to debugger. If the program is already running, close it before attempting to debug."
    <br>
    <br>Most of the solutions you would find via Google, would ask you to change the AIR application descriptor to point to 1.5 namespace. Well, this is one of the biggest reasons for this problem. But another small bug may lead to this occurrence. For details on the same refer to 
    <a href="http://bugs.adobe.com/jira/browse/SDK-19707">http://bugs.adobe.com/jira/browse/SDK-19707</a>
    <br>
    <br>Fixing the bug is too easy,
    <br>
    <ol>
        <li>Download the file change.sh from the <a href="http://bugs.adobe.com/jira/browse/SDK-19707">Bug Database</a>.</li>
        <li>Copy this file change.sh into the SDK parent folder. On a typical installation on Mac, it would resemble <i>/Applications/Adobe Flex Builder 3/sdks/3.4.0</i></li>
        <li>Adjust the file permissions to 755 using <i>chmod 755 change.sh</i></li>
        <li>Execute the script <i>./change.sh</i></li>
        <li>Open your Flex Builder, open the project, run your AIR app and have fun!</li>
    </ol>
</div>
<br>Hope this helps!
