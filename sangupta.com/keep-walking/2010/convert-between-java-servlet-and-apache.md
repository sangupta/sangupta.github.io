---
title: Convert between Java Servlet and Apache HttpClient Cookie's
date: 31 Oct 2010
tags: 
- coding-techniques
- java
alias:
- /tech/convert-between-java-servlet-and-apache.html
- /2010/10/convert-between-java-servlet-and-apache.html
---

When using <a href="http://hc.apache.org/httpclient-3.x/index.html">Apache HttpClient</a> 
(now legacy), one needs to convert between Java Servlet cookies and the Apache HttpClient 
cookies. This basic operation is neither directly supported by the Apache HttpClient library, 
nor by any other open-source library. Hence, I wrote this class below to perform this utility 
conversions.

<!-- break here -->

Grab the code from my 
<a href="http://code.google.com/p/sangupta">Google Code</a> repository.

Hope this helps.

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
package com.sangupta.util;
 
import java.util.Date;
 
import javax.servlet.http.Cookie;
 
/**
 * Utility class to help convert Cookie objects between Java Servlet Cookie's
 * and Apache HttpClient Cookie's. 
 * 
 * @author sangupta
 * @version 1.0
 * @since 30 Oct 2010
 */
public class ApacheCookieUtils {
  
 /**
  * Method to convert an Apache HttpClient cookie to a Java Servlet cookie.
  * 
  * @param apacheCookie the source apache cookie
  * @return a java servlet cookie
  */
 public static Cookie servletCookieFromApacheCookie(org.apache.commons.httpclient.Cookie apacheCookie) {
  if(apacheCookie == null) {
   return null;
  }
   
  String name = apacheCookie.getName();
  String value = apacheCookie.getValue();
   
  Cookie cookie = new Cookie(name, value);
 
  // set the domain
  value = apacheCookie.getDomain();
  if(value != null) {
   cookie.setDomain(value);
  }
   
  // path
  value = apacheCookie.getPath();
  if(value != null) {
   cookie.setPath(value);
  }
   
  // secure
  cookie.setSecure(apacheCookie.getSecure());
 
  // comment
  value = apacheCookie.getComment();
  if(value != null) {
   cookie.setComment(value);
  }
   
  // version
  cookie.setVersion(apacheCookie.getVersion());
   
  // From the Apache source code, maxAge is converted to expiry date using the following formula
  // if (maxAge >= 0) {
        //     setExpiryDate(new Date(System.currentTimeMillis() + maxAge * 1000L));
        // }
  // Reverse this to get the actual max age
   
  Date expiryDate = apacheCookie.getExpiryDate();
  if(expiryDate != null) {
   long maxAge = (expiryDate.getTime() - System.currentTimeMillis()) / 1000;
   // we have to lower down, no other option
   cookie.setMaxAge((int) maxAge);
  }
   
  // return the servlet cookie
  return cookie;
 }
  
 /**
  * Method to convert a Java Servlet cookie to an Apache HttpClient cookie.
  * 
  * @param cookie the Java servlet cookie to convert
  * @return the Apache HttpClient cookie
  */
 public static org.apache.commons.httpclient.Cookie apacheCookieFromServletCookie(Cookie cookie) {
  if(cookie == null) {
   return null;
  }
   
  org.apache.commons.httpclient.Cookie apacheCookie = null;
   
  // get all the relevant parameters
     String domain = cookie.getDomain();
     String name = cookie.getName();
     String value = cookie.getValue();
     String path = cookie.getPath();
     int maxAge = cookie.getMaxAge();
     boolean secure = cookie.getSecure();
      
     // create the apache cookie
     apacheCookie = new org.apache.commons.httpclient.Cookie(domain, name, value, path, maxAge, secure);
      
     // set additional parameters
     apacheCookie.setComment(cookie.getComment());
     apacheCookie.setVersion(cookie.getVersion());
 
     // return the apache cookie
     return apacheCookie;
 }
 
}
```