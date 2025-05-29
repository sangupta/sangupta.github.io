---
title: Eclipse debugger works intermittently
date: 09 Mar 2010
tags: 
- java
- workarounds
alias:
- /tech/eclipse-debugger-works-intermittently.html
- /2010/03/eclipse-debugger-works-intermittently.html
---

Yesterday, I had some tough time figuring why my Eclipse Debugger (for Java) was working 
intermittently. Initially I thought it was due to the recent Eclipse updates I might have 
installed, and hence, I reverted back to Ganymede from Galileo. It still didn't work. The 
next guess was workspace corruption so I deleted and rebuild the entire workspace, but to 
no avail. After a lot of futile efforts and after wasting 3 hours on the same, here is 
what I got.

<!-- break here -->

Eclipse Debugger with Sun JDK 1.6.0_14 is broken. The problem occurs on Windows and Linux 
platforms. This is an issue with the JVM and not the Eclipse Debugger. The workaround is 
to use the -XX:+UseParallelGC VM option. For those interested in knowing more details 
on the bug can refer to this <a href="https://bugs.eclipse.org/bugs/show_bug.cgi?id=279137">Eclipse 
Bug</a>.

For me, I upgraded my system to Sun JDK 1.6.0_18 and am back running on Galileo. 

Hope this helps!