---
layout: post
title: Installing XML editing capabilities in Flash Builder
permalink: /tech/installing-xml-editing-capabilities-in.html
redirect_from: "/2011/01/installing-xml-editing-capabilities-in.html"
date: Fri Jan 21 09:54:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/01/installing-xml-editing-capabilities-in.html
tags: workarounds
---

As we all know, Flash Builder (earlier Flex Builder) is based on Eclipse RCP, lacks 
rich XML editing capabilities which are needed for almost all projects, except the `Hello World!` kinds. 
For those who have used Eclipse, would agree that the Eclipse platform has a feature-rich built-in 
XML editing capabilities. It is easy to use the same capabilities in Flash Builder as well.

<!-- break here -->

To install the plugin, launch your Flash Builder and then choose Help –> Install New Software. Add the f
ollowing location to the list of `Available Software Sites`, <a title="http://download.eclipse.org/releases/galileo/" href="http://download.eclipse.org/releases/galileo/">http://download.eclipse.org/releases/galileo/</a> for Flash Builder 4.0, and click OK. Choose the 
site in the drop down, and wait for the list to populate. Once the list has populated, 
choose `Eclipse XML Editors and Tools` and click on Install. Restart your workbench, and, 
you are done.

Hope this helps.

