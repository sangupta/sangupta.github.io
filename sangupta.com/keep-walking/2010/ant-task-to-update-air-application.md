---
title: Ant task to update the AIR application version number
date: 23 Oct 2010
tags: 
- adobe-air
- tools
alias:
- /tech/ant-task-to-update-air-application.html
- /2010/10/ant-task-to-update-air-application.html
---

Update (30 Oct 2010)
--------------------
The ANT task has been updated to support changes in AIR 2.5. Read more in the <a href="http://blog.sangupta.com/2010/10/update-ant-task-to-update-air.html">updated entry</a>.

Using Continuous Integration in our AIR projects involves updating the build 
number of the AIR application with each build. The version number is stored in 
an application descriptor XML. Working with ANT updating the token involves adding 
a token value to the version attribute and then calling the 
`replace` task to update the value at build time. For example,

<!-- break here -->

```xml
    <!-- An application version designator (such as "v1", "2.5", or "Alpha 1"). Required. --><br>  
    <version>
        @@@ANT_VERSION_TOKEN@@@
    </version>
```

and then using an ANT command as,

```xml
    <replace file="myproject-app.xml" token="@@@ANT_VERSION_TOKEN@@@" value="1.0.0.23" />
```

Simple enough. But, this approach has a downside. When working with Flash Builder 
(formerly, Flex Builder) the version number comes as a messed up string of, 
`@@@ANT_VERSION_TOKEN@@@`. This is not a very good scenario, as one may display this 
string in an About Box, or use the versionto check for update of applications.

I came out with a very simple ANT task that can help you automate the version number. 
The task can be used as,

```xml
    <version appdescriptor="myproject-app.xml" buildnumber="1.0.0.23" />
```

and you application descriptor XML can stay as original,

```xml
    <!-- An application version designator (such as "v1", "2.5", or "Alpha 1"). Required. --><br>  
    <version>
        1.0.0
    </version>
```

You can of course use the ANT build number task to generate a continuous running sequence and use it as,

```xml
    <version appdescriptor="myproject-app.xml" buildnumber="1.0.0.${build.number}" />
```

This has an advantage that when working in Flash Builder, you would get the version number as 
`1.0.0` and when using ANT to build, you get the updated version number.

The code for the ANT task is attached below. You can also pick the code from my 
<a href="http://code.google.com/p/sangupta/">Google Code</a> repository.

```java
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
* tested with AIR SDK version 1.0 to 2.0. Your mileage may vary.
* 
* <b>Note: The application descriptor file must be write-enabled before invoking the task.</b>
* 
* @author Sandeep Gupta <a href="mailto:sangupta@gmail.com">[email]</a>
* @version 1.0
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
 * Constant represnting the platform dependent new-line character.
 */
 private static String newline = System.getProperty("line.separator");
  
 /**
 * Here goes the task execution code, pretty self-explanatory.
 */
 public void execute() throws BuildException {
  // check for build number
  if(this.buildNumber == null || "".equals(this.buildNumber.trim())) {
   throw new BuildException("Build number cannot be empty.");
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
   
  // read the file and modify the build number
  StringBuilder builder = new StringBuilder();
  BufferedReader reader = null;
  Writer output = null;
   
  try {
   reader =  new BufferedReader(new FileReader(xml));
   String line = null;
   while((line = reader.readLine()) != null) {
    String l = line.trim();
    if(l.startsWith("<version>") && l.endsWith("</version>")) {
     int index = line.indexOf(l);
     line = line.substring(0, index) + "<version>" + this.buildNumber + "</version>";
      
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
  
 // Usual accessor's follow
 
 public String getAppDescriptor() {
  return appDescriptor;
 }
 
 public void setAppDescriptor(String appDescriptor) {
  this.appDescriptor = appDescriptor;
 }
 
 public String getBuildNumber() {
  return buildNumber;
 }
 
 public void setBuildNumber(String buildNumber) {
  this.buildNumber = buildNumber;
 }
 
}
```

Hope this helps!