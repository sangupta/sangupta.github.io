---
title: Parsing Typescript in Java
date: 20 Apr 2022
tags: 
- coding-techniques
- java
alias:
- /tech/parsing-typescript-in-java.html
---

This post talks on how you can parse [Typescript][tslang] code in Java using 
[Eclipse V8][eclipse-v8] wrapper. Why would one do that? I used it to prepare
Javascript documentation for [Bedrock][bedrock], my React component library. I
tried using both [React Styleguidist][styleguidist] and [Storybook][storybook]
but haven't liked both (will discuss those reasons in a later post). 

Parsing means generating an [Abstract Syntax Tree][ast] from the TS source code. 
Once you have the AST you can crawl it, to run any transform or aggregation as
you like.

Let's start by creating a new V8 instance that also understands the NodeJS runtime

```java
NodeJS nodeJS = NodeJS.createNodeJS();
```

Next step is to load the Typescript parser in V8 using `require`. I am using 
the entire folder from a previously existing `node_modules` folder.

```java
V8Object typescript = nodeJS.require(new File("path_to/node_modules/typescript"));
```

Now we need to obtain the `Typescript.ScriptTarget.Latest` value.
This value allows us to instruct TS compiler to use latest TS syntax guidelines 
during the parsing phase.

```java
V8Object moduleKind = typescript.getObject("ScriptTarget");
Integer system = moduleKind.getInteger("Latest");
```

Next, we need to setup compiler options. These shall be needed in the next step.

```java
V8Object compilerOptions = new V8Object(nodeJS.getRuntime());
compilerOptions.add("module", system);
```

Before we invoke the parser, let's load the TS source code in memory from the 
file on disk.

```java
String code = org.apache.io.FileUtils.readFiletoString("my-ts-file.ts");
```

Finally time to invoke the TS compiler:

```java
V8Object result = (V8Object) typescript.executeJSFunction("createSourceFile", fileName, code, compilerOptions, true);
```

Iterating over the `V8Object` is difficult, so we will use a utility method
to convert it to normal `java.util.Map`

```java
Map<String, ? super Object> astAsMap = V8ObjectUtils.toMap(result);
```

And that is all what we need. You may now use `astAsMap` to crawl/iterate over the
AST as your use-case desire. But before, we wrap it up here, we need to clean up the
resources that V8 allocated:

```java
while (nodeJS.isRunning()) {
    nodeJS.handleMessage();
}

// release all resources
result.release();
compilerOptions.release();
moduleKind.release();
typescript.release();
nodeJS.release();
```

You can find all the code together in [this Github repository](repo) including conversion
to strongly typed Java objects.

[tslang]: https://www.typescriptlang.org/
[eclipse-v8]: https://github.com/eclipsesource/J2V8
[bedrock]: https://bedrock.sangupta.com/
[styleguidist]: https://react-styleguidist.js.org/
[storybook]: https://storybook.js.org/
[ast]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
[repo]: https://github.com/sangupta/tsparser-j2v8