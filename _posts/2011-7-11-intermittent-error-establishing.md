---
layout: default
title: Intermittent error establishing connection with Spring, Hibernate and C3P0
permalink: /2011/07/intermittent-error-establishing.html
redirect_from: "/2011/07/intermittent-error-establishing.html"
date: Mon Jul 11 12:14:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/07/intermittent-error-establishing.html
tags: java spring-framework workarounds
---
Most of the Java web projects (and desktop projects as well) use the well known 
<a href="http://www.springsource.org/about">Spring</a> and 
<a href="http://hibernate.org/">Hibernate</a> frameworks. I myself have been using them for over 6 years now, and must say, the benefits they have provided have been immense, both in terms of rapid application development, testing and of course, maintenance. With good amount of experience in using the both I rarely find it difficult debugging a bug, but sometimes, I have come across issues that have been both time-consuming and have thrown open unleashed areas of the frameworks. Recently, I happened to land debugging one such issue.
<br>
<br>When running are project, which uses 
<a href="http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/orm/hibernate3/HibernateTemplate.html">HibernateTemplate</a> to simplify access to the data layer, we saw intermittent timeout issues. The intermittent failures in them self were very strange. Running from a machine with query latency of around 10 seconds, only once reproduced the issue. Running from a machine with 2.5 second latency, the issue was 25% reproducible, and from a machine with just 1 second latency (quite close to DB datacenter) never reproduced the issue.
<br>
<br>Our application configuration was pretty simple, Spring 2.5.6 working in tandem with Hibernate 2.4, using C3P0 as the connection pool. Good stack, right?
<br>
<br>There were two Java exceptions which were coming up randomly, as,
<br>
<blockquote>
    <pre>org.hibernate.util.JDBCExceptionReporter<br><br>No suitable driver found for jdbc:oracle:thin:@myDomain:myPort/mySchemaName</pre>
</blockquote>
<b>and,</b>
<br>
<pre>org.springframework.dao.DataAccessResourceFailureException: Hibernate operation: Cannot open connection; SQL [???]; <br>Io exception: The Network Adapter could not establish the connection; nested exception is,<br> java.sql.SQLException: Io exception: The Network Adapter could not establish the connection<br>	at org.springframework.jdbc.support.SQLErrorCodeSQLExceptionTranslator.doTranslate(SQLErrorCodeSQLExceptionTranslator.java:236)<br>	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:72)<br>	at org.springframework.orm.hibernate3.HibernateAccessor.convertJdbcAccessException(HibernateAccessor.java:424)<br>	at org.springframework.orm.hibernate3.HibernateAccessor.convertHibernateAccessException(HibernateAccessor.java:410)<br>	at org.springframework.orm.hibernate3.HibernateTemplate.doExecute(HibernateTemplate.java:424)<br>	at org.springframework.orm.hibernate3.HibernateTemplate.execute(HibernateTemplate.java:339)<br>	at java.util.concurrent.FutureTask$Sync.innerRun(FutureTask.java:303)<br>	at java.util.concurrent.FutureTask.run(FutureTask.java:138)<br>	at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)<br>	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)<br>	at java.lang.Thread.run(Thread.java:662)<br>Caused by: java.sql.SQLException: Io exception: The Network Adapter could not establish the connection<br>	at oracle.jdbc.driver.DatabaseError.throwSqlException(DatabaseError.java:145)<br>	at oracle.jdbc.driver.DatabaseError.throwSqlException(DatabaseError.java:190)<br>	at oracle.jdbc.driver.DatabaseError.throwSqlException(DatabaseError.java:363)<br>	at oracle.jdbc.driver.T4CConnection.logon(T4CConnection.java:401)<br>	at oracle.jdbc.driver.PhysicalConnection.
    <init>
        (PhysicalConnection.java:441)
        <br>	at oracle.jdbc.driver.T4CConnection.
        <init>
            (T4CConnection.java:165)
            <br> at oracle.jdbc.driver.T4CDriverExtension.getConnection(T4CDriverExtension.java:35)
            <br> at oracle.jdbc.driver.OracleDriver.connect(OracleDriver.java:839)
            <br> at java.sql.DriverManager.getConnection(DriverManager.java:582)
            <br> at java.sql.DriverManager.getConnection(DriverManager.java:154)
            <br> at org.springframework.jdbc.datasource.DriverManagerDataSource.getConnectionFromDriverManager(DriverManagerDataSource.java:174)
            <br> at org.springframework.jdbc.datasource.DriverManagerDataSource.getConnectionFromDriver(DriverManagerDataSource.java:165)
            <br> at org.springframework.jdbc.datasource.AbstractDriverBasedDataSource.getConnectionFromDriver(AbstractDriverBasedDataSource.java:149)
            <br> at org.springframework.jdbc.datasource.AbstractDriverBasedDataSource.getConnection(AbstractDriverBasedDataSource.java:119)
            <br> at org.springframework.orm.hibernate3.LocalDataSourceConnectionProvider.getConnection(LocalDataSourceConnectionProvider.java:82)
            <br> at org.hibernate.jdbc.ConnectionManager.openConnection(ConnectionManager.java:417)
            <br> at org.hibernate.jdbc.ConnectionManager.getConnection(ConnectionManager.java:144)
            <br> at org.hibernate.jdbc.AbstractBatcher.prepareQueryStatement(AbstractBatcher.java:139)
            <br> at org.hibernate.loader.Loader.prepareQueryStatement(Loader.java:1560)
            <br> at org.hibernate.loader.Loader.doQuery(Loader.java:661)
            <br> at org.hibernate.loader.Loader.doQueryAndInitializeNonLazyCollections(Loader.java:224)
            <br> at org.hibernate.loader.Loader.doList(Loader.java:2144)
            <br> at org.hibernate.loader.Loader.listIgnoreQueryCache(Loader.java:2028)
            <br> at org.hibernate.loader.Loader.list(Loader.java:2023)
            <br> at org.hibernate.loader.custom.CustomLoader.list(CustomLoader.java:289)
            <br> at org.hibernate.impl.SessionImpl.listCustomQuery(SessionImpl.java:1695)
            <br> at org.hibernate.impl.AbstractSessionImpl.list(AbstractSessionImpl.java:142)
            <br> at org.hibernate.impl.SQLQueryImpl.list(SQLQueryImpl.java:150)
            <br> at org.springframework.orm.hibernate3.HibernateTemplate.doExecute(HibernateTemplate.java:419)
            <br> ... 15 more
            <br>
        </init>
    </init></pre>
<br>Obviously the 
<b>ERROR 1</b> listed above was nothing related, as the code had obtained DB connections (for sure). The 
<b>ERROR 2</b> indicated that we were opening more connections than what the database could handle. We tried setting up a local database and tested the whole code, but the error won't reproduce. We thus concluded (only to be proven wrong later) that the database was unable to handle the load of our connections (a connection pool of 100 connections). We lowered our throttle of hitting to 50, 20, 10, and lastly 5 connections but the error still occurred on the staging and production servers. We contacted the 
<tt>database team</tt> and they informed that there were more than enough free handles on the database side and no alert was raised for DB going overboard the total number of allowed connections.
<br>
<br>This made us change our mind to think that there was some connectivity issues with the stating/production machines, both being in the same datacenter. We tested heavily both the machines but found nothing that suggested a connectivity issue. Again we stood at a blank wall.
<br>
<br>We again went back to the DB team to help us debug. As one another test, we ran our code in the DBA presence monitoring the database. The DBA informed that we were creating connections at a rapid pace, creating them, firing a query, and then disconnecting. Voila! What was that - we were using a connection pool. Was it not working?
<br>
<br>We went back to the code and ran the profiler along with 
<tt>netstat</tt>s. This confirmed that we were creating DB connections and then dropping for every single query. But why should that happen, when we were for sure, using 
<a href="http://sourceforge.net/projects/c3p0/">C3P0</a> (shipped with Hibernate) for our connection pooling. After deep penetration into the code, we figured out that firing plain 
<b>SQL queries</b> using Hibernate template does not makes use of the inherent connection pool of Hibernate. This broke all our code - we were using the 
<tt>HibernateTemplate</tt> extensively in our application and firing native queries (why so - leaving as it calls for another detailed post) over the 
<a href="http://mysql.com/">MySQL</a> database.
<br>
<br>As a quick fix, we added 
<a href="http://commons.apache.org/dbcp/">Apache Commons DBCP</a> connection pooling layer over our data-source. This made our stack look something like,
<br>
<blockquote>
    DB -&gt; Apache DBCP DataSource -&gt; Hibernate -&gt; C3P0 -&gt; Spring -&gt; Our application
</blockquote>.
<br>This seemed to do the trick. Not only did the connection fetch failure vanished, we also saw improved performance gains with connection pooling (as if we didn't knew).
<br>
<br>As they say, better late than never - we could fix the problem well before the release, burning some mid-night...err... mid-day oil. But this taught me a lesson,
<br>
<blockquote>
    <b>Always profile your application for connections before releasing.</b>
</blockquote>.
<br>Hope this helps someone out there having a similar problem. You do, try this and if it gets resolved, drop in a comment.
<br>
