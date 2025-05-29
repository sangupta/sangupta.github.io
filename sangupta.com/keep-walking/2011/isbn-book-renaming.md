---
title: ISBN Book Renaming
date: 18 Jun 2011
tags: 
- java
- my-projects
- tools
alias:
- /tech/isbn-book-renaming.html
- /2011/06/isbn-book-renaming.html
---

Being a lazy Saturday morning, on breakfast table my father told me that how he was 
spending his time. He downloaded some books from the internet where in the file was 
named using the ISBN number of the book, say as, `1590595262.pdf` for the **The Robosapien
Companion**, and that he was spending time renaming these books by searching Google 
and giving the file a proper name. I felt bad that me being a developer, still my dad 
was wasting time on something futile.

<!-- break here -->

Hence, I loaded my `Eclipse` and sat to write a small command line tool that can do the 
same. Given a folder the tool will pick up all the files in the folder (except ZIP files), 
find files that may be ISBN named, and once found, will try and hit the free webservice at 
<a href="http://isbndb.org">ISBNDB</a> to retrieve the book name. If retrieval succeeds, 
the file will be renamed as per the book name, else skipped.

The tool can be downloaded from my 
<a href="http://code.google.com/p/sangupta/downloads/detail?name=ISBNBookRenamer-1.0-b2.jar">Google Code repository</a>. Using the tool is plain and simple,

```bash
$ java -jar ISBNBookRenamer-1.0-b2.jar <folder>;

where 
	folder is the folder that consists of files named as 
	<ISBN number>.*. Note that any file ending in .ZIP will be skipped.
```

Hope this helps!

The source code for the tool is as under,

```java
package com.sangupta.isbntools;
 
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
 
/**
 * Command line tool to rename the files in a folder picking the filename to be
 * the ISBN number and hitting the webservice at http://isbndb.com for getting 
 * the filename.
 * 
 * All files ending in extension ZIP are skipped.
 * 
 * @author sangupta
 * @since 18 Jun 2011
 */
public class ISBNBookRenamer {
         
        /**
         * The API key for the site http://isbndb.com where we get the book names from the ISBN code
         */
        private static final String ISBNDB_API_KEY = "";
         
        /**
         * The API end point that will be hit
         */
        private static final String API_URL = "http://isbndb.com/api/books.xml?access_key=" + ISBNDB_API_KEY + "&index1=isbn&value1=";
 
        /**
         * The main entry point.
         * 
         * @param args
         */
        public static void main(String[] args) {
                // check for proper usage
                if(args.length != 1) {
                        System.out.println("Usage: ");
                        System.out.println("       $ java -jar ISBNBookRenamer <folder>");
                        System.out.println("              folder: the folder where all books are stored");
                        return;
                }
 
                // perform sanity checks
                String folderPath = args[0];
                File folder = new File(folderPath);
                 
                if(!folder.exists()) {
                        System.out.println("The folder path you specified does not exists.");
                        return;
                }
                 
                if(!folder.isDirectory()) {
                        System.out.println("The path you specified is not a folder.");
                        return;
                }
                 
                // get a list of all files
                File[] files = folder.listFiles();
                if(files == null || files.length == 0) {
                        System.out.println("No file in folder to work upon.");
                        return;
                }
                 
                for(File localFile : files) {
                        renameBook(localFile);
                }
                 
                System.out.println("Done renaming books.");
        }
 
        /**
         * Processes the given file and renames the file as per ISBN bookname
         * if possible.
         * 
         * @param localFile
         */
        private static void renameBook(File localFile) {
                String fileName = localFile.getName();
                String parentFolder = localFile.getParent();
                 
                // strip off name and extension
                String name = null, extension = null;
                int extensionIndex = fileName.lastIndexOf('.');
                if(extensionIndex != -1) {
                        name = fileName.substring(0, extensionIndex);
                        extension = fileName.substring(extensionIndex + 1);
                        if(extension.equalsIgnoreCase("zip")) {
                                System.out.println("Filename " + fileName + "extension is ZIP... skipping!");
                                return;
                        }
                }
                 
                if(name.length() != 10) {
                        System.out.println("Filename " + fileName + "is longer than 10 characters... skipping!");
                        return;
                }
                 
                // now fetch the ISBN name for the book
                String bookName = getISBNBookName(name);
                if(bookName == null) {
                        System.out.println("Unable to fetch book name for file: " + fileName + "... skipping!");
                        return;
                }
                 
                // rename the book
                bookName = sanitizeBookName(bookName);
                 
                String newFileName = bookName + '.' + extension;
                File newFile = new File(parentFolder + File.separatorChar + newFileName);
                System.out.println("Renaming " + fileName + " to " + newFileName);
                boolean success = localFile.renameTo(newFile);
                if(!success) {
                        System.out.println("Failed renaming " + fileName + " to " + newFileName);
                        return;
                }
        }
 
        /**
         * Sanitize the bookname and remove characters that cannot be a part of the filename
         * 
         * @param bookName
         * @return
         */
        private static String sanitizeBookName(String bookName) {
                bookName = bookName.replace(':', '_');
                return bookName;
        }
 
        /**
         * Given the ISBN number, return the bookname as possible.
         * 
         * @param name
         * @return
         */
        private static String getISBNBookName(String name) {
                String urlToHit = API_URL + name;
                 
                // hit the webservice
                HttpURLConnection conn = null;
                InputStream in = null;
            BufferedReader rd = null;
                try {
                        conn = (HttpURLConnection) (new URL(urlToHit)).openConnection();
                        conn.setRequestMethod("GET");
         
                        int responseCode = conn.getResponseCode();
                        if (responseCode != HttpURLConnection.HTTP_OK) {
                                in = conn.getErrorStream();
                                rd = new BufferedReader(new InputStreamReader(in));
                            String tempLine = rd.readLine();
                            StringBuilder response = new StringBuilder();
                                while (tempLine != null) {
                                        response.append(tempLine).append("\n");
                                        tempLine = rd.readLine();
                                }
                                 
                                System.out.println("Unable to get book name for " + name + " with error: " + response.toString());
                        } else {
                                in = conn.getInputStream();
                                rd = new BufferedReader(new InputStreamReader(in));
                            String tempLine = rd.readLine();
                            StringBuilder response = new StringBuilder();
                                while (tempLine != null) {
                                        response.append(tempLine).append("\n");
                                        tempLine = rd.readLine();
                                }
                                 
                                String xml = response.toString();
                                System.out.println("XML response returned is: " + xml);
                                 
                                int titleIndexStart = xml.indexOf("<Title>");
                                if(titleIndexStart == -1) {
                                        System.out.println("Unable to get book title via XML response: " + xml);
                                        return null;
                                }
                                 
                                int titleIndexEnd = xml.indexOf("</Title>", titleIndexStart);
                                String bookName = xml.substring(titleIndexStart + 7, titleIndexEnd);
                                return bookName;
                        }
                } catch (MalformedURLException e) {
                        System.out.println("Unable to get book name for book " + name);
                        e.printStackTrace();
                } catch (IOException e) {
                        System.out.println("Unable to get book name for book " + name);
                        e.printStackTrace();
                } finally {
                        if(conn != null) {
                                conn.disconnect();
                        }
 
                        if(rd != null) {
                                try {
                                        rd.close();
                                } catch (IOException e) {
                                        e.printStackTrace();
                                }
                        }
                         
                        if(in != null) {
                                try {
                                        in.close();
                                } catch (IOException e) {
                                        e.printStackTrace();
                                }
                        }
                }
                 
                return null;
        }
 
}
```