---
title: Update&#58; Ant task to update the AIR application version number
date: 30 Oct 2010
tags: 
- adobe-air
- coding-techniques
alias:
- /tech/update-ant-task-to-update-air.html
- /2010/10/update-ant-task-to-update-air.html
---

Recently <a href="http://www.adobe.com/products/air/sdk/">AIR 2.5 SDK</a> was released by 
Adobe. One of the major changes in AIR 2.5 SDK is to the 
<a href="http://kb2.adobe.com/cps/873/cpsid_87300.html">AIR Application Update Framework</a>. 
This impacts the way, one specifies an `application version` in their AIR applications. The 
`version` tag has been removed, and two new tags, `versionNumber` and `versionLabel` have been added. 

<!-- break here -->

I had earlier posted code (see 
<a href="http://blog.sangupta.com/2010/10/ant-task-to-update-air-application.html">Ant task to 
update AIR application number</a>) for an ANT task that helps update the application version in 
a continuous integration model. In this post, I update the ANT task to support the new attributes of AIR 2.5.

The task can be used as,

```xml
   <!-- For projects up to AIR 2.0 -->
	<version appdescriptor="myproject-app.xml" buildnumber="1.0.0.${build.number}">
	</version>
	 
	<!-- For projects on AIR 2.5 -->
	<version appdescriptor="myproject-app.xml" versionnumber="1.0.0" versionlabel="1.0.0.${build.number}">
	</version>
```

The code can also be downloaded from my 
<a href="http://code.google.com/p/sangupta">Google Code</a> repository.

```as3
/**
 * Copyright (C) 2010, Sandeep Gupta
 * http://www.sangupta.com
 * 
 * The file is licensed under the the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package com.sangupta.ant.tasks;
 
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
 
import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;
 
/**
* A simple ANT task that takes in an Adobe AIR application's application descriptor
* XML file and replaces the <version> string with the given build number. The
* task comes handy when used in a continuous integration process. The task has been
* tested with AIR SDK version 1.0 to 2.5. For AIR version's up to 2.0 the task replaces
* the <code>version</code> tag. For AIR version 2.5, the task replaces <code>versionNumber</code>
* and <code>versionLabel</code> tags. In case, the <code>versionLabel</code> is not
* specified, the task replaces the same value as <code>versionNumber</code>. The 
* <code>versionNumber</code> should be of the format <0-999>.<0-999>.<0-999>
* 
* Works for my use cases, your mileage may vary.
* 
* 
* <b>Note: The application descriptor file must be write-enabled before invoking the task.</b>
* 
* @author Sandeep Gupta <a href="mailto:sangupta@gmail.com">[email]</a>
* @version 1.1
* @since 23 Oct 2010
*/
public class AIRVersionTask extends Task {
  
 /**
 * The location of the application descriptor XML file.
 */
 private String appDescriptor = null;
  
 /**
 * The build number to replace the version with.
 */
 private String buildNumber = null;
  
 /**
  * AIR 2.5+ build number of the form x.y.z
  */
 private String versionNumber = null;
  
 /**
  * AIR 2.5+ build label string that is shown to the user (optional).
  */
 private String versionLabel = null;
  
 /**
 * Constant representing the platform dependent new-line character.
 */
 private static String newline = System.getProperty("line.separator");
  
 /**
 * Here goes the task execution code, pretty self-explanatory.
 */
 public void execute() throws BuildException {
  // test for AIR version
  if(isEmpty(this.buildNumber) && isEmpty(this.versionNumber)) {
   throw new BuildException("Either buildNumber or versionNumber must be specified.");
  }
   
  if(!isEmpty(this.buildNumber) && !isEmpty(this.versionNumber)) {
   throw new BuildException("Only one of buildNumber or versionNumber should be specified.");
  }
   
  // check the file has to be an XML file
  if(!(this.appDescriptor != null && this.appDescriptor.toLowerCase().endsWith(".xml"))) {
   throw new BuildException("The application descriptor must be an XML file.");
  }
   
  // check if the file is actually present
  File xml = new File(this.appDescriptor);
  if(!xml.exists()) {
   throw new BuildException("The provided application descriptor file does not exist.");
  }
   
  // check if this is AIR 2.5 build
  boolean isAir25 = false;
   
  // check for build number
  if(isEmpty(this.buildNumber)) {
   isAir25 = true;
  }
   
  // if there is not version label - put the version number in
  if(isAir25) {
   if(isEmpty(this.versionLabel)) {
    this.versionLabel = this.versionNumber;
   }
  }
   
  // read the file and modify the build number
  StringBuilder builder = new StringBuilder();
  BufferedReader reader = null;
  Writer output = null;
   
  try {
   reader =  new BufferedReader(new FileReader(xml));
   String line = null;
   while((line = reader.readLine()) != null) {
     
    if(!isAir25) {
     line = replaceTag(line, "version", this.buildNumber);
    } else {
     line = replaceTag(line, "versionNumber", this.versionNumber);
     line = replaceTag(line, "versionLabel", this.versionLabel);
    }
     
    builder.append(line);
    builder.append(newline);
   }
 
   // gracefully close the reader
   reader.close();
 
   // now we have the contents in string builder
   // just replace the file in
   output = new BufferedWriter(new FileWriter(xml));
   output.write(builder.toString());
   output.close();
    
   // all done
  } catch(IOException e) {
   throw new BuildException("Unable to set version string.", e);
  } finally {
   if(reader != null) {
    try {
     reader.close();
    } catch(Exception ex) {
     // do nothing
    }
   }
    
   if(output != null) {
    try {
     output.close();
    } catch(Exception ex) {
     // do nothing
    }
   }
  }
 }
  
 /**
  * Given a tag name replace the tag value with the given value.
  * 
  * @param line the line to look for tag in
  * @param tagName the name of the tag to search for
  * @param value the value to be put as tag value
  * @return the modified/original line depending if the tag was replaced or not
  */
 private String replaceTag(String line, String tagName, String value) {
  String startTag = "<" + tagName + ">";
  String endTag = "<!--" + tagName + "-->";
   
  String outLine = line.trim();
  if(outLine.startsWith(startTag) && outLine.endsWith(endTag)) {
   int index = line.indexOf(outLine);
   line = line.substring(0, index) + startTag + value + endTag;
  }
   
  return line;
 }
  
 /**
  * Convenience function to test if a string contains anything except whitespaces.
  * 
  * @param string string to test for.
  * @return <code>true</code> if the string is <code>null</code> or empty, <code>false</code> otherwise.
  */
 private boolean isEmpty(String string) {
  if(string == null || string.trim().length() == 0) {
   return true;
  }
   
  return false;
 }
 
 // Usual accessor's follow
 
 /**
  * @return the appDescriptor
  */
 public String getAppDescriptor() {
  return appDescriptor;
 }
 
 /**
  * @param appDescriptor the appDescriptor to set
  */
 public void setAppDescriptor(String appDescriptor) {
  this.appDescriptor = appDescriptor;
 }
 
 /**
  * @return the buildNumber
  */
 public String getBuildNumber() {
  return buildNumber;
 }
 
 /**
  * @param buildNumber the buildNumber to set
  */
 public void setBuildNumber(String buildNumber) {
  this.buildNumber = buildNumber;
 }
 
 /**
  * @return the versionNumber
  */
 public String getVersionNumber() {
  return versionNumber;
 }
 
 /**
  * @param versionNumber the versionNumber to set
  */
 public void setVersionNumber(String versionNumber) {
  this.versionNumber = versionNumber;
 }
 
 /**
  * @return the versionLabel
  */
 public String getVersionLabel() {
  return versionLabel;
 }
 
 /**
  * @param versionLabel the versionLabel to set
  */
 public void setVersionLabel(String versionLabel) {
  this.versionLabel = versionLabel;
 }
  
}
```

Hope this helps.