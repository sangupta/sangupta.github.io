---
layout: default
title: Ant task to update the AIR application version number
permalink: /2010/10/ant-task-to-update-air-application.html
redirect_from: "/2010/10/ant-task-to-update-air-application.html"
date: Sat Oct 23 12:53:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/10/ant-task-to-update-air-application.html
tags: adobe-air tools
---
<b>NOTE (30 Oct 2010): The ANT task has been updated to support changes in AIR 2.5. Read more in the <a href="http://blog.sangupta.com/2010/10/update-ant-task-to-update-air.html">updated entry</a>.</b>
<br>
<br>Using Continuous Integration in our AIR projects involves updating the build number of the AIR application with each build. The version number is stored in an application descriptor XML. Working with ANT updating the token involves adding a token value to the version attribute and then calling the 
<b>replace</b> task to update the value at build time. For example,
<br>
<br>
<pre class="brush: xml">
    <!-- An application version designator (such as "v1", "2.5", or "Alpha 1"). Required. --><br>  
    <version>
        @@@ANT_VERSION_TOKEN@@@
    </version><br></pre>
<br>and then using an ANT command as,
<br>
<pre class="brush: xml">
    <replace file="myproject-app.xml" token="@@@ANT_VERSION_TOKEN@@@" value="1.0.0.23" /><br></pre>
<br>Simple enough. But, this approach has a downside. When working with Flash Builder (formerly, Flex Builder) the version number comes as a messed up string of, 
<tt>@@@ANT_VERSION_TOKEN@@@</tt>. This is not a very good scenario, as one may display this string in an About Box, or use the versionto check for update of applications.
<br>
<br>I came out with a very simple ANT task that can help you automate the version number. The task can be used as,
<br>
<pre class="brush: xml">
    <version appdescriptor="myproject-app.xml" buildnumber="1.0.0.23" /><br></pre>and you application descriptor XML can stay as original,
<br>
<pre class="brush: xml">
    <!-- An application version designator (such as "v1", "2.5", or "Alpha 1"). Required. --><br>  
    <version>
        1.0.0
    </version><br></pre>You can of course use the ANT build number task to generate a continuous running sequence and use it as,
<br>
<pre class="brush: xml">
    <version appdescriptor="myproject-app.xml" buildnumber="1.0.0.${build.number}" /><br></pre>
<br>This has an advantage that when working in Flash Builder, you would get the version number as 
<b>1.0.0</b> and when using ANT to build, you get the updated version number.
<br>
<br>The code for the ANT task is attached below. You can also pick the code from my 
<a href="http://code.google.com/p/sangupta/">Google Code</a> repository.
<br>
<br>
<pre class="brush: java">/**<br> * Copyright (C) 2010, Sandeep Gupta<br> * http://www.sangupta.com<br> * <br> * The file is licensed under the the Apache License, Version 2.0<br> * (the "License"); you may not use this file except in compliance with<br> * the License.  You may obtain a copy of the License at<br> * <br> * http://www.apache.org/licenses/LICENSE-2.0<br> * <br> * Unless required by applicable law or agreed to in writing, software<br> * distributed under the License is distributed on an "AS IS" BASIS,<br> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br> * <br> * See the License for the specific language governing permissions and<br> * limitations under the License.<br> * <br> */<br>package com.sangupta.ant.tasks;<br><br>import java.io.BufferedReader;<br>import java.io.BufferedWriter;<br>import java.io.File;<br>import java.io.FileReader;<br>import java.io.FileWriter;<br>import java.io.IOException;<br>import java.io.Writer;<br><br>import org.apache.tools.ant.BuildException;<br>import org.apache.tools.ant.Task;<br><br>/**<br>* A simple ANT task that takes in an Adobe AIR application's application descriptor<br>* XML file and replaces the &lt;version&gt; string with the given build number. The<br>* task comes handy when used in a continuous integration process. The task has been<br>* tested with AIR SDK version 1.0 to 2.0. Your mileage may vary.<br>* <br>* <b>Note: The application descriptor file must be write-enabled before invoking the task.</b><br>* <br>* @author Sandeep Gupta <a href="mailto:sangupta@gmail.com">[email]</a><br>* @version 1.0<br>* @since 23 Oct 2010<br>*/<br>public class AIRVersionTask extends Task {<br> <br> /**<br> * The location of the application descriptor XML file.<br> */<br> private String appDescriptor = null;<br> <br> /**<br> * The build number to replace the version with.<br> */<br> private String buildNumber = null;<br> <br> /**<br> * Constant represnting the platform dependent new-line character.<br> */<br> private static String newline = System.getProperty("line.separator");<br> <br> /**<br> * Here goes the task execution code, pretty self-explanatory.<br> */<br> public void execute() throws BuildException {<br>  // check for build number<br>  if(this.buildNumber == null || "".equals(this.buildNumber.trim())) {<br>   throw new BuildException("Build number cannot be empty.");<br>  }<br>  <br>  // check the file has to be an XML file<br>  if(!(this.appDescriptor != null &amp;&amp; this.appDescriptor.toLowerCase().endsWith(".xml"))) {<br>   throw new BuildException("The application descriptor must be an XML file.");<br>  }<br>  <br>  // check if the file is actually present<br>  File xml = new File(this.appDescriptor);<br>  if(!xml.exists()) {<br>   throw new BuildException("The provided application descriptor file does not exist.");<br>  }<br>  <br>  // read the file and modify the build number<br>  StringBuilder builder = new StringBuilder();<br>  BufferedReader reader = null;<br>  Writer output = null;<br>  <br>  try {<br>   reader =  new BufferedReader(new FileReader(xml));<br>   String line = null;<br>   while((line = reader.readLine()) != null) {<br>    String l = line.trim();<br>    if(l.startsWith("
    <version>
        ") &amp;&amp; l.endsWith("
    </version>")) {<br>     int index = line.indexOf(l);<br>     line = line.substring(0, index) + "
    <version>
        " + this.buildNumber + "
    </version>";<br>     <br>    }<br>    builder.append(line);<br>    builder.append(newline);<br>   }<br><br>   // gracefully close the reader<br>   reader.close();<br><br>   // now we have the contents in string builder<br>   // just replace the file in<br>   output = new BufferedWriter(new FileWriter(xml));<br>   output.write(builder.toString());<br>   output.close();<br>   <br>   // all done<br>  } catch(IOException e) {<br>   throw new BuildException("Unable to set version string.", e);<br>  } finally {<br>   if(reader != null) {<br>    try {<br>     reader.close();<br>    } catch(Exception ex) {<br>     // do nothing<br>    }<br>   }<br>   <br>   if(output != null) {<br>    try {<br>     output.close();<br>    } catch(Exception ex) {<br>     // do nothing<br>    }<br>   }<br>  }<br> }<br> <br> // Usual accessor's follow<br><br> public String getAppDescriptor() {<br>  return appDescriptor;<br> }<br><br> public void setAppDescriptor(String appDescriptor) {<br>  this.appDescriptor = appDescriptor;<br> }<br><br> public String getBuildNumber() {<br>  return buildNumber;<br> }<br><br> public void setBuildNumber(String buildNumber) {<br>  this.buildNumber = buildNumber;<br> }<br><br>}<br></pre>
<br>
<br>Hope this helps.
<br>~ Sandeep
