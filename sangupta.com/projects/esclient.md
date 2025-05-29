---
layout: project
title: ESClient
github: esclient
maven: false
---

`esclient` is very strongly-typed ElasticSearch SDK that uses `Google GSON` library for
serialization/deserialization and offers features like `interceptors`.

**NOTE:** The SDK is very nascent and being developed as I move a project from `Apache Solr`
to `ElasticSearch` - sooner or later, support for all APIs will come.

### Features

* very strongly-typed
* based on Google GSON
* Supports interceptors

### Usage

```java
// create a new client
ElasticSearchClient esClient = new HttpElasticSearchClientImpl("http://localhost:9200");

// check if an index exists or not
boolean exists = esClient.existsIndex("sangupta");

// create a new one
if(!exists) {
    // use default index settings
    IndexSettings settings = new IndexSettings();
    
    // create a new mapping for a new collection in index
    IndexMapping documents = new IndexMapping();
    
    // add fields that are part of index
	documents.addIndexField("_id", new StringField(FieldAnalysis.NotAnalyzed));
	documents.addIndexField("docID", new StringField(FieldAnalysis.NotAnalyzed));
	documents.addIndexField("caseID", new StringField());
	documents.addIndexField("link", new StringField());
	documents.addIndexField("author", new StringField());
	documents.addIndexField("title", new StringField());
	documents.addIndexField("content", new StringField());
	documents.addIndexField("updated", new DateField(DateFieldFormat.EpochMillis));
	documents.addIndexField("comments", new StringField(FieldAnalysis.NotAnalyzed));
	
	Map<String, IndexMapping> mappings = new HashMap<>();
	mappings.put("docs", documents);
	
	// create index
	esClient.createIndex("sangupta", settings, mappings);
}

// let's add an interceptor that will create a new field in index
// when the document is being indexed. It will also check via a boolean
// field INDEXED if the document is already in ElasticSearch

esClient.addDocumentIndexInterceptor(new DocumentIndexInterceptor<CustomDocument>() {
			
	@Override
	public boolean beforeSerialization(CustomDocument document) {
        if(document.isIndexed()) {
            return true; // stop indexing now
        }
        
        // go ahead and index
		return false;
	}
	
	@Override
	public boolean afterSerialization(JsonElement jsonElement) {
		JsonObject object = jsonElement.getAsJsonObject();
		if(object == null) {
			return false;
		}
		
		// remove the boolean property - no need of it
		object.remove("indexed");
		
		// add the indexing time
        object.addProperty("indexedTime", System.currentTimeMillis());
        
        // go ahead and index
		return false;
	}
	
});

// now add data to it
for(CustomDocument doc : getAllDocuments()) {
    esClient.indexDocument("sangupta", "docs", doc.getDocID(), doc);
```

### License

The library is released under the terms of **Apache Public License Version 2**.
