---
title: EGit GitHub Commit API and Commit Stats
date: 10 Nov 2011
tags: 
- java
- workarounds
alias:
- /tech/egit-github-commit-api-and-commit-stats.html
- /2011/11/egit-github-commit-api-and-commit-stats.html
---

While working today with <a href="http://www.eclipse.org/egit">EGit</a> for the 
<a href="https://github.com">GitHub</a> API, I found out that there is no way to get the 
Commit statistics and the various file details. If you ponder over the API details at 
<a href="http://developer.github.com/v3/repos/commits/">http://developer.github.com/v3/repos/commits/</a>,

<!-- break here -->

```text
GET /repos/:user/:repo/commits/:sha
```

the response for the API contains details about the lines added/deleted in the commit. The response 
also contains details about the various files that are impacted. See the *stats* and the *files* section below:

```json
{
  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
  "commit": {
    "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
    "author": {
      "name": "Monalisa Octocat",
      "email": "support@github.com",
      "date": "2011-04-14T16:00:49Z"
    },
    "committer": {
      "name": "Monalisa Octocat",
      "email": "support@github.com",
      "date": "2011-04-14T16:00:49Z"
    },
    "message": "Fix all the bugs",
    "tree": {
      "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
    }
  },
  "author": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "url": "https://api.github.com/users/octocat"
  },
  "committer": {
    "login": "octocat",
    "id": 1,
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "url": "https://api.github.com/users/octocat"
  },
  "parents": [
    {
      "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
    }
  ],
  "stats": {
    "additions": 104,
    "deletions": 4,
    "total": 108
  },
  "files": [
    {
      "filename": "file1.txt",
      "additions": 10,
      "deletions": 2,
      "total": 12
    }
  ]
}
```

As I needed these values, I happened to go over the source code for *EGit* and find a way around. Must 
say, the way the source code is structured makes it super-easy to modify the code for additional API values.

Below are the two simple changes I made to make sure the API returns the details I needed,

**Add the following class `org.eclipse.egit.github.core.Stats`**

```java
package org.eclipse.egit.github.core;
 
public class Stats {
  
 private int additions;
  
 private int deletions;
  
 private int total;
 
 public int getAdditions() {
  return additions;
 }
 
 public void setAdditions(int additions) {
  this.additions = additions;
 }
 
 public int getDeletions() {
  return deletions;
 }
 
 public void setDeletions(int deletions) {
  this.deletions = deletions;
 }
 
 public int getTotal() {
  return total;
 }
 
 public void setTotal(int total) {
  this.total = total;
 }
 
}
```

**Modify the class `org.eclipse.egit.github.core.RepositoryCommit`** to add the following lines:

```java
private Stats stats;
  
 private List<CommitFile> files;
 
 public Stats getStats() {
  return stats;
 }
 
 public void setStats(Stats stats) {
  this.stats = stats;
 }
 
 public List<CommitFile> getFiles() {
  return files;
 }
 
 public void setFiles(List<CommitFile> files) {
  this.files = files;
 }
}
```

And we are done. Calling the following API,

```java
public void test() {
 
    CommitService commitService = new CommitService();
 
    RepositoryCommit commit = commitService.getCommit(repository, sha);
 
    System.out.println("Total lines impacted: " + commit.getTotal());
 
    System.out.println("Total files impacted: " + commit.getFiles().size());
}
```

hould return back the various statistics as returned by **GitHub**.

Hope this helps!

`Update:` Added the files as a GitHub gist at <a href="https://gist.github.com/1355351">https://gist.github.com/1355351</a>