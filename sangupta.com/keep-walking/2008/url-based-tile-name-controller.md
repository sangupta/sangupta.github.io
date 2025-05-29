---
title: Url based Tile name Controller
date: 18 Oct 2008
tags: 
- coding-techniques
- java
- spring-framework
- web
alias:
- /tech/url-based-tile-name-controller.html
- /2008/10/url-based-tile-name-controller.html
---

Tiles, a framework that is used extensively for templating in Java based web 
applications. Spring Framework, a dependency injection container that makes 
configuration easier. There are several controllers available in the Spring 
framework which makes mapping static JSP/JSF pages directly to the URI's without 
writing boiler plate code. But in most of the cases, we use Tiles for a templating. 
What to do in such a case? There is no single controller that would help us map 
URI's to a tilename. Here is what I came up... A simple controller that would 
directly map a URI to a tilename and forward the request out.

<!-- break here -->

A typical usage example is as under,

```xml
<bean name="urlTilenameController" class="org.springframework.web.servlet.mvc.UrlTilenameViewController" >  
	<property name="indexTile" value=".homePage" />  
	<property name="toLowercase" value="true" />  
	<property name="stripAfterLastDot" value="true" />  
	<property name="insertStartingDot" value="true" />
</bean>
```

The parameters should be self explanatory. In case you would like to know more on this, feel 
free to contact me. 

Hope this helps. 
Keep Walking!

```java
package org.springframework.web.servlet.mvc;
 
import java.io.File;
 
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
 
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
 
/**
* Convert the URL into a tile name so that we don't need to configure
* everything manually.
*
* @author Sandeep on Sep 25, 2008 @ 9:29:54 PM
*
*/
public class UrlTilenameViewController extends AbstractUrlViewController  {
 
	private static final Log log = LogFactory.getLog(UrlTilenameViewController.class);
	 
	private String indexTile;
	 
	private boolean toLowercase;
	 
	private boolean stripAfterLastDot;
	 
	private boolean insertStartingDot;
	 
	/**
	* @param request
	* @return
	* @see org.springframework.web.servlet.mvc.AbstractUrlViewController#getViewNameForRequest(javax.servlet.http.HttpServletRequest)
	*/
	@Override
	protected String getViewNameForRequest(HttpServletRequest request) {
		String uri = extractOperableUrl(request);
		String tileName = getViewNameForUrlPath(uri);
	 
		if(log.isDebugEnabled()) {
			log.debug("uri " + uri + " converted to tilename " + tileName);
		}
	 
		return tileName;
	}
	 
	protected String extractOperableUrl(HttpServletRequest request) {
		String uri = request.getRequestURI();
		ServletContext context = request.getSession().getServletContext();
		File rootFile = new File(context.getRealPath ("/"));
		String rootContext = rootFile.getName() + "/";
	 
		if(log.isDebugEnabled()) {
			log.debug("Request uri received is " + uri + " in the application context " + rootContext);
		}
	 
		if(uri.startsWith("/")) {
			uri = uri.substring(1);
		}
	
		if(uri.startsWith(rootContext)) {
			uri = uri.substring(rootContext.length());
		}
	 
		return uri;
	}
	 
	protected String getViewNameForUrlPath(String uri) {
		if(uri == null || "".equals(uri)) {
			return this.indexTile;
		}
	
		uri = uri.replaceAll("/", ".");
		if(this.toLowercase) {
			uri = uri.toLowerCase();
		}
	
		if(this.stripAfterLastDot) {
			int index = uri.lastIndexOf(".");
			if(index != -1) {
				uri = uri.substring(0, index);
			}
		}
	
		if(this.insertStartingDot) {
			uri = "." + uri;
		}

		return uri;
	}
	 
	/** 
	* Returns the indexTile.
	*
	* @return the indexTile.
	*/
	public String getIndexTile() {
		return indexTile;
	}
	 
	/** 
	* Sets the indexTile to the specified value.
	* 
	* @param indexTile indexTile to set.
	*/
	public void setIndexTile(String indexTile) {
		this.indexTile = indexTile;
	}
	 
	/** 
	* Returns the toLowercase.
	* 
	* @return the toLowercase.
	*/
	public boolean isToLowercase() {
		return toLowercase;
	}
	 
	/** 
	* Sets the toLowercase to the specified value.
	* 
	* @param toLowercase toLowercase to set.
	*/
	public void setToLowercase(boolean toLowercase) {
		this.toLowercase = toLowercase;
	}
	 
	/** 
	* Returns the stripAfterLastDot.
	* 
	* @return the stripAfterLastDot.
	*/
	public boolean isStripAfterLastDot() {
		return stripAfterLastDot;
	}
	 
	/** 
	* Sets the stripAfterLastDot to the specified value.
	* 
	* @param stripAfterLastDot stripAfterLastDot to set.
	*/
	public void setStripAfterLastDot(boolean stripAfterLastDot) {
		this.stripAfterLastDot = stripAfterLastDot;
	}
	 
	/** 
	* Returns the insertStartingDot.
	* 
	* @return the insertStartingDot.
	*/
	public boolean isInsertStartingDot() {
		return insertStartingDot;
	}
	 
	/** 
	* Sets the insertStartingDot to the specified value.
	* 
	* @param insertStartingDot insertStartingDot to set.
	*/
	public void setInsertStartingDot(boolean insertStartingDot) {
		this.insertStartingDot = insertStartingDot;
	}

}
```