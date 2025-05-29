---
layout: project
title: DryRun
github: dryrun
---

**dryrun** is a collection of already-mocked classes that serve pretty useful during testing. For example
unit testing code with `RedisTemplate` usually involves spinning a Redis instance. Our `DryRunRedisTemplate`
uses the `MockJedis` framework to connect to an in-memory Redis, that connects via API calls and not via
the usual connection.

Currently only `RedisTemplate` with **operations for values** is available. Operations on sets/lists/... are still pending.

Usage
-----

To test code that uses `RedisTemplate` as a service, just inject the mocked template as:

```java
// create a MockJedis instance
MockJedis jedis = new MockJedis("mock-jedis");

// create an instance of RedisTemplate
RedisTemplate<String, byte[]> template = new DryRunRedisTemplate<String, byte[]>(jedis);

// must specify the key and value serializers
template.setKeySerializer(new StringRedisSerializer());
template.setValueSerializer(new RedisSerializer<byte[]>() {

	@Override
	public byte[] serialize(byte[] t) throws SerializationException {
		return t;
	}

	@Override
	public byte[] deserialize(byte[] bytes) throws SerializationException {
		return bytes;
	}
});

// inject in your service
MyTestableService service = new DefaultMyTestableServiceImpl();
service.setRedisTemplate(redisTemplate);
```

Downloads
---------

The library can be downloaded from Maven Central using:

```xml
<dependency>
    <groupId>com.sangupta</groupId>
    <artifactId>dryrun</artifactId>
    <version>0.1.0</version>
</dependency>
```
