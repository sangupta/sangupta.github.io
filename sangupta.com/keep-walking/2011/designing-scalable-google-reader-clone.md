---
title: Designing a Scalable Google Reader Clone
date: 11 Feb 2011
tags: 
- coding-techniques
- scalability
alias:
- /tech/designing-scalable-google-reader-clone.html
- /2011/02/designing-scalable-google-reader-clone.html
---

Google Reader is a very handy web application for those who like reading a lot. It lets 
you organize all your feeds in a single location, is not a very complicated, and has 
everything from a user’s perspective. For a geek, it’s just a front-end for viewing an 
RSS/Atom feed (XML data) with many regular user experience workflows thrown in. But is t
hat it to Reader? Let’s explore!

<!-- break here -->

There are many variants that have tried to imitate Google Reader, with most of them being 
desktop clients. IE, Firefox, Safari, Outlook and host of other daily-use applications 
bring feed aggregation to your desktop. They all provide most or more features than the 
product in discussion. Right! But, there is one distinction that makes Google Reader stand 
out from all others. I love desktop clients, but what to do when you have multiple machines 
you work on. Personally, I work on at least 3 different machines every single day. Gosh, 
keeping them in sync is a pain. This reason does not hold good for users who have one machine 
to hit. I will ask them to take a look at another advantage: Speed. Google Reader is a web 
app serving millions of users, and billions of feed posts each day, with a speed that is 
unmatched even in desktop clients.


<a href="http://sourceforge.net/projects/gregarius/">Gregarius</a>, an open source web based 
feed aggregator did try an implementation. Unfortunately, it seems to be no longer maintained, the 
<a href="http://gregarius.net/">home page</a> is dead, and the 
<a href="http://sourceforge.net/projects/gregarius/files/">last commits</a> are more than 
two-year old. But even if you liven it up, it won’t scale to a level of Google Reader (as 
per my understanding of the code, noting that I am too immature in PHP). The reason is simple. 
Gregarius was meant as a personal hosted tool, and was not built for scalability grounds up 
to support millions of users.

> Scalability and speed; are thus, the biggest competition-thrashing features that Reader can be proud of

For some reasons, not worthy of being mentioned, I happened to spend some time on trying 
to design an implementation similar to Google Reader which may scale equally. Below are my 
very own thoughts on how to build such an application.

#### Application Use-Cases

To begin with let’s examine the various use-cases the application needs to support,

* View the home page for the user
  * View a list of all feeds with an unread count
  * View an aggregated list of recent posts and their individual status
* View the posts inside a given feed
* View individual posts in detail or a partial snippet
* Allow search within a group of feeds or the entire list of feeds
* Store user’s social metadata - liking, stars etc.

Each of these use-cases needs to be supported in the least possible time for the best user experience, 
how about under a second or two. Only then, the users may be expected to return to the application, often.

#### Application Components

At a glance, our application will have the following major components:

* `Unique Feed List`: A list of all unique feeds that all users have subscribed to. As feeds are shared 
between users, it is better to traverse each feed only once and save system resources for other tasks. The 
only reason to declare this list as a component is to make it stand out in the entire design.

* `Feed Crawler`: This takes in a given feed URL, fetches the latest content and parses the given feed 
XML and stores each entry/post in a database as an entry for further processing.

* `Snippet Creator`: The snippet creator reads each of the database entries fetched by the crawler and 
extracts the text that needs to be shown to the user when they view individual post in the client UI. In 
case the post needs to be shortened with a ‘more...’ link, this component is responsible for the magic.

* `Search Index Builder`: Similar to snippet creator, the index builder updates the search index for the 
feed, adding search metadata for the new posts. Note that the search indexes are maintained at a feed 
level.

Let’s see how these components interact with each other in a real-life scenario.

Consider the use-case where a user adds his/her first feed to the account. First the 
application would go ahead and check if the feed is already registered in the unique 
list of feeds. If not, add the feed to our global list. If yes, fetch the number of 
posts the feed has from the past details. Next we will create a new row in our data 
store as,

| User ID | Feed ID | Total posts in feed | Unread Count |
| ------- | ------- | ------------------- | ------------ |
| u1      | f1      | 100                 | 100          |
| u1      | f2      | 0                   | 0            |


In the table above, f1 is a feed that was already in the unique list and had 100 posts. Feed 
f2 was not in the list and is a new addition to our master list. Total unread posts count (for 
existing feeds) is kept the same as total posts.

The master table for the unique feed list looks like,

| Feed ID | Feed URL | Last Crawled | Clients | Crawled | Updates | Latest Post ID |
| ------- | -------- | ------------ | ------- | ------- | ------- | -------------- |
| f1      | url1     | t1           | 2       | 1       | 1       | p18            |
| f2      | url2     | t2           | 1       | 0       | 0       |                |


The CLIENTS column is incremented whenever a user adds the feed to his/her account, and 
decremented whenever the user un-subscribes from the feed. This way in case all users go 
ahead and remove the feed, the count will become ZERO. Hence, this serves as a flag to 
the crawler not to crawl and use system resources on the feed. The reason for not deleting 
the row is not to overuse the unique Feed IDs and also, in anticipation that a user may 
subscribe to it in future when we can utilize our previous work.

As soon as the feed is registered in the global list of feeds, the feed crawler picks it 
up and crawls for new posts. The CRAWLED and UPDATES columns are updated by the feed 
crawler based on the response it receives from the host server. As the feed is picked, 
the value of CRAWLED is incremented. In case the crawler finds an update as per the last 
post ID stored with the feed, it increments the UPDATES column. The crawler also writes 
the post id of the latest feed post in the table. The LAST_POST_ID column thus serves as 
guidance to the crawler on how many pages to crawl for a given feed URL before pulling in 
the entire delta from the last crawl.

The ratio of CRAWLED to UPDATES can then be utilized to assign crawling rates between 
different rate-crawlers. We can have high-rate crawlers which crawl at a much higher 
frequency than the slow crawlers. This gives us a better way of utilizing our system’s 
resources to keep in sync with most popular feeds.

Next, the feed crawler stores the new data for a given feed in another table from where 
information can be extracted from. Say, for feed f1 the crawler built up a delta load dl1 
which it stores in the data store. Similarly, for feed f2 the entire load is considered 
to be the delta load and stored in the data store.

| Feed ID | Delta Load | Last Updated |
| ------- | ---------- | ------------ |
| f1      | dl1        | ...          |
| f2      | dl2        | ...          |

The crawler here works as a producer using the data table above as its repository. Where 
there is a producer, there is a consumer. In our application we have not one but two 
consumers.

The first consumer is the `Snippet Creator`. It extracts various posts from the feed delta 
and generates the snippet based on our needs. For each post in the feed delta, the snippet 
creator generates loads of rows in the snippet table as,

| Feed ID | Post ID | Snippet ID     |
| ------- | ------- | -------------- |
| f1      | p1      | s<sub>1</sub>1 |
| f1      | p2      | s<sub>1</sub>2 |
| ...     | ...     | ...            |
| f2      | p1      | s<sub>2</sub>1 |
| f2      | p2      | s<sub>2</sub>2 |

The snippet may be stored in the exact format as it would need to be pushed to the client 
for rendering, or as an object notation either in XML or JSON. JSON should be preferable 
as it separates the concerns with the UI layer and can easily be parsed in JavaScript, 
the browser language.

For every feed, a user is usually interested in the last N posts (say 20); for this is what 
they get to see on their screen upon signing in. Thus, the snippet creator can be used to 
generate a consolidated snippet of these last N posts and store it as a single entity for 
faster retrievals in yet another table.

| Feed ID | Last 20 Posts Snippet |
| ------- | --------------------- |
| f1      | 20s1                  |
| f2      | 20s2                  |

The second consumer is our `Search Index Builder`. The index builder extracts text from the 
various posts in the delta load, and updates the corresponding search index data (how about 
<a href="http://lucene.apache.org/">Lucene</a> :?) for the feed. Our system will maintain one 
single index per feed, which is updated on each new delta load of the feed. This index can 
be used to perform searches on behalf of users.

| Feed ID | Search Index ID | Raw Index Data |
| ------- | --------------- | -------------- |
| f1      | si1             | ...            |
| f2      | si2             | ...            |

This way we have all the data for performing business operations on our feed data.

Now, let’s get back to our long forgotten user who made the mistake of adding a new feed 
to the account.

As the user adds a feed to the account, all above operations except the indexing happen in 
real-time. Thus, the user request (while adding a new feed) results in the following 
operations on server,

* Add the feed entry for the user from global list
* Crawl the feed and bring the data to the feed load database
* The snippet creator runs and generates individual snippets and as well as the combined 20 posts snippet


This 20 posts snippet is returned back to the client (browser) as the response where it is 
then rendered for the user.

A user now moves ahead to read the posts, starring some and liking some. This meta needs to be 
stored separately so that it can be utilized the next time the user accesses the account. The 
data can be stored as,

| User ID | Feed ID | Post ID | Read | Liked | Starred |
| ------- | ------- | ------- | ---- | ----- | ------- |
| u1      | f1      | p1      | y    | n     | n       |
| u1      | f1      | p2      | y    | y     | n       |
| u1      | f1      | p3      | y    | n     | y       |

The above data model works well and fast for a new user who has just added a single feed to 
his account and has just read the posts. 99% users are those who will have hundreds of feeds 
in their feed list and the home screen will be an aggregation of these feeds. Querying each 
feed at sign-in and building the home screen will surely scare the user to run away, never 
to return back. Thus, an efficient way is needed for the same.

Consider a user who has 200 feeds added to the account and already has read most of the posts. 
When such a user signs-in to the account, a home screen needs to be presented with a list of 
all feeds on the left and a consolidated view of the posts on the right as soon as possible.

To speed up, this process can be broken into two different requests from the client from a bare-bone HTML page.

* One to fetch the list of all feeds to be displayed on the left
* And, second to fetch the content pane data aka the home screen

#### Building the feed list

The list of feeds a user has subscribed to will not change frequently, and thus is a perfect 
candidate for long-time caching. Thus, the list can be maintained in another table as,

| User ID | Feed List Data |
| ------- | -------------- |
| u1      | fl1            |
| u2      | fl2            |

The feed list is the actual response data that needs to be thrown to the client with some 
missing parameters. The data can be either HTML or XML/JSON in case we want the flexibility 
on the client to render it differently. Choosing JSON is the best option, as we would need 
not rebuilt the above table whenever the UI team goes ahead and changes the look and feel 
of the client. The missing parameters are the post unread count against each feed. The same 
can be aggregated as part of a datastore query, replaced in the cached response, and thrown 
to the client.

#### Building the Home Screen

Home screen is the actual reading pane in the HTML page, As soon as the server receives the 
user’s request to fetch the home screen, the server shoots a query to fetch the list of all 
feed IDs a user has subscribed to. Once the list is available, multiple parallel queries are 
shot to fetch the snippets of last N posts for each feed. Remember we stored them as 20s(n) 
in one of our tables above. In our example, 200 such queries are shot and an accumulated list 
of 4000 entities made (In reality, multiple queries to the datastore can be merged into a 
single query, something similar to IN query in a normal relational database). This list of 
4000 posts is sorted out chronologically descending and the top 50 posts separated out.

These 50 posts form our current home screen for the user. Meta for these 50 posts is again 
requested in parallel from the data store (read status, liking, starred etc.). This data is 
now merged and a response for the client generated. This response is again JSON data for UI 
flexibility on client. This is the time, where we should cache this data for the user.

| User ID | Home Screen Data |
| ------- | ---------------- |
| u1      | hs1              |
| u2      | hs2              |

Thus, the next time the user signs-in, we can go ahead and display the home screen right away; 
what happens to the updates between the last sign-in time and the current time is something we 
will tackle a little later (under Refresh problem).

The other 3950 posts in the list we built in our previous step can again be cached to a separate 
temporary table till the user session (in case the user scrolls down and wants to read more of 
it). This data can be stored in chunks of pages, and the table as said before is only session 
limited. As soon as the user session terminates, the data corresponding to the user is cleared 
up.

| User Session ID | Page Number | Page Data |
| --------------- | ----------- | --------- |
| us1             | 2           | ...       |
| us1             | 3           | ...       |

The data is stored starting from page 2 because the data for page 1 has already been stored as part 
of the home screen table.

#### Tackling the Refresh problem

When a user signs-in, displaying the cached home screen is only good as a temporal solution. Once, 
the page has loaded up, a user needs to see if there were any updates since their last sign-in.

To achieve the same, make the client send a fresh request for loading the updates of the home screen. 
This request will complete the entire cycle of feed crawl/snippet extractor builder into one single 
sequential call. This request thus makes sure that all fresh updates are sent back to the client, 
where an updated home screen can be overlaid. Before returning the response to the client, the request 
can shoot another (another) call to rebuild the search index and other house-keeping.

#### Feed folders

Organization of various feeds into folders aka categories is a nice way of grouping similar feeds. Say, 
feeds from all Google products may be grouped into a folder called ‘Google’. This allows for easy 
attention when you have hundreds of unread items.

To arrange feeds into folder, let’s create a new table to store the hierarchy.

| User ID | Folder ID | Folder Name |
| ------- | --------- | ----------- |
| u1      | x1        | Google      |
| u1      | x2        | Humor       |
| u1      | x3        | Poetry      |

And modify our first table to include a folder ID column.

| User ID | Feed ID | Parent Folder ID | Total Posts In Feed | Unread Count |
| ------- | ------- | ---------------- | ------------------- | ------------ |
| u1      | f1      |                  | 100                 | 100          |
| u1      | f2      |  x1              | 0                   | 0            |

Thus, when building the folder list to be fetched for left pane, we can read the additional 
hierarchy table and build a tree instead of a list. As the folder IDs are stored in the feed 
data table, the group unread count can easily be computed when sending the response to the 
client.

Similarly, when a user clicks on the folder view, we can adopt the same approach as we did 
for the home screen and build up a cached list of folder main screen and a subset of all 
other grouped entities (in a user-session table). Thus, folder views and subsequent pagination 
will serve us fast.

#### Search

Searching should be pretty easy for a given user. With the user’s feed list in place, and a 
1:1 mapping between the feed and it’s search index, searching will involve parallel queries 
to search within each index. Thus, to search in a list of 200 feeds, 200 search operations 
are fired in each of the individual indices, and results extracted. The results are collated 
and sent back to the mother ship. The mother ship can then send back a subset of these search 
results to the client, and store others in memcache for traversal as the user flips in 
paginated results.

#### Scalability

You might be wondering as to why this whole model will scale. In today’s world, real scaling 
lies in scaling-out and not scaling-up. With the advent of high-performance, scalable data 
stores like mongoDB, HyperTable or the GAE datastore, it is easy for application to scale to 
mammoth amounts of data without worrying about the performance impact, and the complexities 
of data sharding, replication and consistency. 

Why NoSQL? Relational databases do have various advantages, but tend to get complex when 
sharding data. In the life of an application, there may be scenarios where sharding needs 
to be changed in-between. At this point, RDBMS systems tend to limit the developer’s hands. 
Note that am not averse of RDBMS systems. Facebook already has demonstrated how to operate 
one of the largest MySQL clusters in a performance critical application.

#### Speed

The following table illustrates the current average numbers for GAE for various operations 
(rough estimates as on Feb 7, 2011 from the GAE status page):

| Operation                                | Time (in milliseconds) |
| ---------------------------------------- | ---------------------- |
| Latency in fetching a URL from Amazon S3 | 100                    |
| GET latency in datastore                 | 20                     |
| PUT latency in Datastore                 | 30                     |
| UPDATE latency in Datastore              | 40                     |
| DELETE latency in Datastore              | 25                     |
| QUERY latency in Datastore               | 80                     |
| GET latency in MemCache                  | 2.5                    |
| PUT latency in MemCache                  | 3.2                    |

The following table illustrates the various times of GET queries fired on the GAE datastore 
(averaged for 10 iterations). The code for the sample test is available at 
<a href="http://code.google.com/p/sangupta/source/browse/#svn/trunk/gaeperf">http://code.google.com/p/sangupta/source/browse/#svn/trunk/gaeperf</a>.

| Operation                                                          | Time (in milliseconds) |
| ------------------------------------------------------------------ | ---------------------- |
| Fetching 200 rows from a datatable consisting of 10KB payload each | 175.5 ~ 180            |
| Storing a 500KB data string in MemCache                            | 65.4 ~ 70              |
| Fetching 200 rows of 100KB payload each                            | 608.5 ! 610            |
| Fetching 50 rows of 1KB payload each                               | 88.7 ~ 90              |
| Time to fetch ONE feed from Internet                               | 81.2 ~ 100             |

As mentioned in the post, 
<a href="http://googleappengine.blogspot.com/2009/06/10-things-you-probably-didnt-know-about.html">10 
things you didn’t knew about GAE</a>, 

* The datastore performance is not impacted by the number of entities it stores
* The cost of running a query is proportional to the number of results returned by that query

Considering the above two tables, let’s try and calculate the time for various use-cases 
of our application. We can safely assume here that above timings will hold good in the real 
application for the assumptions mentioned in the above mentioned article.

**Cost of building the home page from scratch**

>   Query to fetch the list of feeds for a user and the unread count: 180 ms
>   Query to fetch the last N posts of each feed: 610 ms
>   Merging and building the list of feeds: 50 ms
>   Query to fetch the meta for 50 posts: 90 ms
>   Constructing the home page: 50 ms
>   Storing list of feeds in cache: 70 ms
>   Storing home page in cache: 70 ms
>
>
>   Total cost: 1120 ms

**Cost of fetching the home page from cache**

>   Query to fetch the list of feeds for a user and the unread count: 180 ms
>   Query to fetch the home page from cache: 70 ms
>
>
>   Total cost: 250 ms

**Cost of adding a feed to the account

>   Fetch the feed data: 100 ms
>   Extract the snippets: 100 ms
>   Rebuild the home screen: 1120 ms
>
>
>   Total Cost: 1320 ms

**Cost of searching a term in the list of feeds**

>   Fetch a list of feed ids for the user: 180 ms
>   Parallel queries to search within these feeds: 1000 ms
>   Consolidating the search results: 50ms
>   Storing the extra results for pagination in memcache: 50ms
>
>
> Total Cost: 1280 ms

On pen and paper, this looks good to me. Not sure, if other optimizations/changes would be necessary 
when you built it up. There may be a time I will try my hands at this, till then I will keep it this 
way.

#### References

> All that we know is due to the work of others, and should be cited for any and every reason.

The largest source of information on how the Google Reader client interacts with its servers, came from 
<a href="http://www.fiddler2.com/fiddler2/">Fiddler</a>. Yes, you read that right! 
<a href="http://www.fiddler2.com/fiddler2/">Fiddler</a>, is a Web Debugging Proxy tool that let's you 
view the traffic between your machine and the servers. Watching how and what requests were shot by my 
browser on opening Google Reader, I gained a lot of insight on how one can speed up a web application's 
launch and its home view.

Next, the credit goes to my friends who are always ready for a discussion so geek :)

Next are the web resources that helped me understand a lot on scalability and design. In no particular order,

* <a href="http://refcardz.dzone.com/refcardz/getting-started-nosql-and-data">http://refcardz.dzone.com/refcardz/getting-started-nosql-and-data</a>
* <a href="http://en.wikipedia.org/wiki/Scalability">http://en.wikipedia.org/wiki/Scalability</a>
* <a href="http://googleappengine.blogspot.com/2009/06/10-things-you-probably-didnt-know-about.html">http://googleappengine.blogspot.com/2009/06/10-things-you-probably-didnt-know-about.html</a>
* <a href="http://www.readwriteweb.com/cloud/2011/01/how-twitter-uses-nosql.php">http://www.readwriteweb.com/cloud/2011/01/how-twitter-uses-nosql.php</a>
* <a href="http://highscalability.com/scaling-twitter-making-twitter-10000-percent-faster">http://highscalability.com/scaling-twitter-making-twitter-10000-percent-faster</a>
* <a href="http://blog.evanweaver.com/">http://blog.evanweaver.com/</a>
* <a href="http://www.google.com/reader/view/">http://www.google.com/reader/view/</a>

And last, but not the least, a little bit of personal experience with design.

#### Discussion

Am open to discussing this design with all of you out there, for that is the only chance where I will 
learn extra. And, I need the chance!