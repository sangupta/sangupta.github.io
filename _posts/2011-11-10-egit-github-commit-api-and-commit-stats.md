---
layout: default
title: EGit GitHub Commit API and Commit Stats
permalink: /2011/11/egit-github-commit-api-and-commit-stats.html
redirect_from: "/2011/11/egit-github-commit-api-and-commit-stats.html"
date: Thu Nov 10 21:48:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/11/egit-github-commit-api-and-commit-stats.html
tags: java workarounds
---
While working today with 
<a href="http://www.eclipse.org/egit">EGit</a> for the 
<a href="https://github.com">GitHub</a> API, I found out that there is no way to get the Commit statistics and the various file details. If you ponder over the API details at 
<a href="http://developer.github.com/v3/repos/commits/">http://developer.github.com/v3/repos/commits/</a>,
<br>
<br>
<pre class="brush: text">GET /repos/:user/:repo/commits/:sha<br></pre>
<br>the response for the API contains details about the lines added/deleted in the commit. The response also contains details about the various files that are impacted. See the *stats* and the *files* section below:
<br>
<br>
<pre class="brush: text">{<br>  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",<br>  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",<br>  "commit": {<br>    "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",<br>    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",<br>    "author": {<br>      "name": "Monalisa Octocat",<br>      "email": "support@github.com",<br>      "date": "2011-04-14T16:00:49Z"<br>    },<br>    "committer": {<br>      "name": "Monalisa Octocat",<br>      "email": "support@github.com",<br>      "date": "2011-04-14T16:00:49Z"<br>    },<br>    "message": "Fix all the bugs",<br>    "tree": {<br>      "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",<br>      "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"<br>    }<br>  },<br>  "author": {<br>    "login": "octocat",<br>    "id": 1,<br>    "avatar_url": "https://github.com/images/error/octocat_happy.gif",<br>    "url": "https://api.github.com/users/octocat"<br>  },<br>  "committer": {<br>    "login": "octocat",<br>    "id": 1,<br>    "avatar_url": "https://github.com/images/error/octocat_happy.gif",<br>    "url": "https://api.github.com/users/octocat"<br>  },<br>  "parents": [<br>    {<br>      "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",<br>      "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"<br>    }<br>  ],<br>  "stats": {<br>    "additions": 104,<br>    "deletions": 4,<br>    "total": 108<br>  },<br>  "files": [<br>    {<br>      "filename": "file1.txt",<br>      "additions": 10,<br>      "deletions": 2,<br>      "total": 12<br>    }<br>  ]<br>}<br></pre>
<br>As I needed these values, I happened to go over the source code for *EGit* and find a way around. Must say, the way the source code is structured makes it super-easy to modify the code for additional API values.
<br>
<br>Below are the two simple changes I made to make sure the API returns the details I needed,
<br>
<br>
<b>Add the following class <tt>org.eclipse.egit.github.core.Stats</tt></b>
<br>
<pre class="brush: java">package org.eclipse.egit.github.core;<br><br>public class Stats {<br> <br> private int additions;<br> <br> private int deletions;<br> <br> private int total;<br><br> public int getAdditions() {<br>  return additions;<br> }<br><br> public void setAdditions(int additions) {<br>  this.additions = additions;<br> }<br><br> public int getDeletions() {<br>  return deletions;<br> }<br><br> public void setDeletions(int deletions) {<br>  this.deletions = deletions;<br> }<br><br> public int getTotal() {<br>  return total;<br> }<br><br> public void setTotal(int total) {<br>  this.total = total;<br> }<br><br>}</pre>
<br>
<b>Modify the class <tt>org.eclipse.egit.github.core.RepositoryCommit</tt></b> to add the following lines:
<br>
<pre class="brush: java">private Stats stats;<br> <br> private List&lt;CommitFile&gt; files;<br><br> public Stats getStats() {<br>  return stats;<br> }<br><br> public void setStats(Stats stats) {<br>  this.stats = stats;<br> }<br><br> public List&lt;CommitFile&gt; getFiles() {<br>  return files;<br> }<br><br> public void setFiles(List&lt;CommitFile&gt; files) {<br>  this.files = files;<br> }<br></pre>
<br>And we are done. Calling the following API,
<br>
<pre class="brush: java">public void test() {<br><br>    CommitService commitService = new CommitService();<br><br>    RepositoryCommit commit = commitService.getCommit(repository, sha);<br><br>    System.out.println("Total lines impacted: " + commit.getTotal());<br><br>    System.out.println("Total files impacted: " + commit.getFiles().size());<br>}<br></pre>
<br>should return back the various statistics as returned by *GitHub*.
<br>
<br>Hope this helps!
<br>
<br>
<b>Update:</b> Added the files as a GitHub gist at 
<a href="https://gist.github.com/1355351">https://gist.github.com/1355351</a>
