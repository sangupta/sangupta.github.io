---
title: Intermittent error establishing connection with Spring, Hibernate and C3P0
date: 11 Jul 2011
tags: 
- java
- spring-framework
- workarounds
alias:
- /tech/intermittent-error-establishing.html
- /2011/07/intermittent-error-establishing.html
---

Most of the Java web projects (and desktop projects as well) use the well known 
<a href="http://www.springsource.org/about">Spring</a> and 
<a href="http://hibernate.org/">Hibernate</a> frameworks. I myself have been using them for 
over 6 years now, and must say, the benefits they have provided have been immense, both in 
terms of rapid application development, testing and of course, maintenance. With good amount 
of experience in using the both I rarely find it difficult debugging a bug, but sometimes, I 
have come across issues that have been both time-consuming and have thrown open unleashed 
areas of the frameworks. Recently, I happened to land debugging one such issue.

<!-- break here -->

When running are project, which uses 
<a href="http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/orm/hibernate3/HibernateTemplate.html">HibernateTemplate</a> 
to simplify access to the data layer, we saw intermittent timeout issues. The intermittent 
failures in them self were very strange. Running from a machine with query latency of around 
10 seconds, only once reproduced the issue. Running from a machine with 2.5 second latency, 
the issue was 25% reproducible, and from a machine with just 1 second latency (quite close 
to DB datacenter) never reproduced the issue.

Our application configuration was pretty simple, Spring 2.5.6 working in tandem with 
Hibernate 2.4, using C3P0 as the connection pool. Good stack, right?

There were two Java exceptions which were coming up randomly, as,

```text
org.hibernate.util.JDBCExceptionReporterL No suitable driver found for jdbc:oracle:thin:@myDomain:myPort/mySchemaName
```

and,

```text
org.springframework.dao.DataAccessResourceFailureException: Hibernate operation: Cannot open connection; SQL [???]; 
Io exception: The Network Adapter could not establish the connection; nested exception is,
 java.sql.SQLException: Io exception: The Network Adapter could not establish the connection
    at org.springframework.jdbc.support.SQLErrorCodeSQLExceptionTranslator.doTranslate(SQLErrorCodeSQLExceptionTranslator.java:236)
    at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:72)
    at org.springframework.orm.hibernate3.HibernateAccessor.convertJdbcAccessException(HibernateAccessor.java:424)
    at org.springframework.orm.hibernate3.HibernateAccessor.convertHibernateAccessException(HibernateAccessor.java:410)
    at org.springframework.orm.hibernate3.HibernateTemplate.doExecute(HibernateTemplate.java:424)
    at org.springframework.orm.hibernate3.HibernateTemplate.execute(HibernateTemplate.java:339)
    at java.util.concurrent.FutureTask$Sync.innerRun(FutureTask.java:303)
    at java.util.concurrent.FutureTask.run(FutureTask.java:138)
    at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
    at java.lang.Thread.run(Thread.java:662)
Caused by: java.sql.SQLException: Io exception: The Network Adapter could not establish the connection
    at oracle.jdbc.driver.DatabaseError.throwSqlException(DatabaseError.java:145)
    at oracle.jdbc.driver.DatabaseError.throwSqlException(DatabaseError.java:190)
    at oracle.jdbc.driver.DatabaseError.throwSqlException(DatabaseError.java:363)
    at oracle.jdbc.driver.T4CConnection.logon(T4CConnection.java:401)
    at oracle.jdbc.driver.PhysicalConnection.(PhysicalConnection.java:441)
    at oracle.jdbc.driver.T4CConnection.(T4CConnection.java:165)
    at oracle.jdbc.driver.T4CDriverExtension.getConnection(T4CDriverExtension.java:35)
    at oracle.jdbc.driver.OracleDriver.connect(OracleDriver.java:839)
    at java.sql.DriverManager.getConnection(DriverManager.java:582)
    at java.sql.DriverManager.getConnection(DriverManager.java:154)
    at org.springframework.jdbc.datasource.DriverManagerDataSource.getConnectionFromDriverManager(DriverManagerDataSource.java:174)
    at org.springframework.jdbc.datasource.DriverManagerDataSource.getConnectionFromDriver(DriverManagerDataSource.java:165)
    at org.springframework.jdbc.datasource.AbstractDriverBasedDataSource.getConnectionFromDriver(AbstractDriverBasedDataSource.java:149)
    at org.springframework.jdbc.datasource.AbstractDriverBasedDataSource.getConnection(AbstractDriverBasedDataSource.java:119)
    at org.springframework.orm.hibernate3.LocalDataSourceConnectionProvider.getConnection(LocalDataSourceConnectionProvider.java:82)
    at org.hibernate.jdbc.ConnectionManager.openConnection(ConnectionManager.java:417)
    at org.hibernate.jdbc.ConnectionManager.getConnection(ConnectionManager.java:144)
    at org.hibernate.jdbc.AbstractBatcher.prepareQueryStatement(AbstractBatcher.java:139)
    at org.hibernate.loader.Loader.prepareQueryStatement(Loader.java:1560)
    at org.hibernate.loader.Loader.doQuery(Loader.java:661)
    at org.hibernate.loader.Loader.doQueryAndInitializeNonLazyCollections(Loader.java:224)
    at org.hibernate.loader.Loader.doList(Loader.java:2144)
    at org.hibernate.loader.Loader.listIgnoreQueryCache(Loader.java:2028)
    at org.hibernate.loader.Loader.list(Loader.java:2023)
    at org.hibernate.loader.custom.CustomLoader.list(CustomLoader.java:289)
    at org.hibernate.impl.SessionImpl.listCustomQuery(SessionImpl.java:1695)
    at org.hibernate.impl.AbstractSessionImpl.list(AbstractSessionImpl.java:142)
    at org.hibernate.impl.SQLQueryImpl.list(SQLQueryImpl.java:150)
    at org.springframework.orm.hibernate3.HibernateTemplate.doExecute(HibernateTemplate.java:419)
    ... 15 more
```

Obviously the `ERROR 1` listed above was nothing related, as the code had obtained DB connections (for sure). The 
`ERROR 2` indicated that we were opening more connections than what the database could handle. We tried setting 
up a local database and tested the whole code, but the error won't reproduce. We thus concluded (only to be 
proven wrong later) that the database was unable to handle the load of our connections (a connection pool of 
100 connections). We lowered our throttle of hitting to 50, 20, 10, and lastly 5 connections but the error 
still occurred on the staging and production servers. We contacted the `database team` and they informed that 
there were more than enough free handles on the database side and no alert was raised for DB going overboard 
the total number of allowed connections.

This made us change our mind to think that there was some connectivity issues with the stating/production 
machines, both being in the same datacenter. We tested heavily both the machines but found nothing that s
uggested a connectivity issue. Again we stood at a blank wall.

We again went back to the DB team to help us debug. As one another test, we ran our code in the DBA presence 
monitoring the database. The DBA informed that we were creating connections at a rapid pace, creating them, 
firing a query, and then disconnecting. Voila! What was that - we were using a connection pool. Was it not 
working?

We went back to the code and ran the profiler along with `netstat`s. This confirmed that we were creating 
DB connections and then dropping for every single query. But why should that happen, when we were for sure, using 
<a href="http://sourceforge.net/projects/c3p0/">C3P0</a> (shipped with Hibernate) for our connection pooling. 
After deep penetration into the code, we figured out that firing plain `SQL queries` using Hibernate template 
does not makes use of the inherent connection pool of Hibernate. This broke all our code - we were using the 
`HibernateTemplate` extensively in our application and firing native queries (why so - leaving as it calls 
for another detailed post) over the `MySQL` database.

As a quick fix, we added <a href="http://commons.apache.org/dbcp/">Apache Commons DBCP</a> connection pooling 
layer over our data-source. This made our stack look something like,

> DB -> Apache DBCP DataSource -> Hibernate -> C3P0 -> Spring -> Our application

This seemed to do the trick. Not only did the connection fetch failure vanished, we also saw improved 
performance gains with connection pooling (as if we didn't knew).

As they say, better late than never - we could fix the problem well before the release, burning some 
mid-night...err... mid-day oil. But this taught me a lesson,

> Always profile your application for connections before releasing.

Hope this helps someone out there having a similar problem. You do, try this and if it gets resolved, drop 
in a comment.