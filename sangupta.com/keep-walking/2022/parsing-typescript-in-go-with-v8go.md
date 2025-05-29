---
title: Parsing Typescript in Go using V8Go
date: 24 Apr 2022
tags: 
- coding-techniques
- golang
alias:
- /tech/parsing-typescript-in-go-with-v8go.html
---

In my [earlier post][post] we saw how we can parse [Typescript][tslang] into an 
[Abstract Syntax Tree][ast] using [Eclipse J2V8][eclipse-v8]. In this post, we 
will explore the same in [Go][golang] using [v8go][v8go].

Using `Go` has advantages if you are building a tool as you can ship a single
native binary without any depdendency. Though `Java` has the convenience of **write once, run many**
but it still requires the presence of `JVM` on the user's machine.

Back to the task at hand, the code requires the following steps:
* Initialize and load V8
* Load Typescript JS library
* Load the Typescript code that you would like to parse
* And, finally call the TS parser code to obtain the AST

Let's get started. The first step is to initialize a new V8 context. 

```go
ctx := v8.NewContext()
```

Once V8 is up, we need to load the Typescript JS code. We make use of a locally
saved `typescript.js` file for the same. Read it in memory and then use the `RunScript`
method to load the script.

```go
tsSource, err := ioutil.ReadFile("/path/to/ts/on/disk/typescript.js")
if err != nil {
    panic(err) // panic if load failed
}

// load typescript by converting []byte to string
ctx.RunScript(string(tsSource), "typescript.js")
```

As Typescript is now loaded, we need to build the compiler options to let TS know that
we would like to use the latest syntax version for parsing

```go
// read global object
obj := ctx.Global()
typescript, _ := obj.Get("ts")
ts, _ := typescript.AsObject()

// fmt.Println(typescript.IsObject())
moduleKindJs, _ := ts.Get("ScriptTarget")
moduleKind, _ := moduleKindJs.AsObject()

systemJs, _ := moduleKind.Get("Latest")
system := systemJs.String()
```

Next, obtain the function `createSourceFile` from the loaded `ts` object. This allows
us to invoke the function directly from Go.

```go
fnJs, _ := ts.Get("createSourceFile")
fn, _ := fnJs.AsFunction()
```

Load the typescript code that you would like to parse:

```go
// read the source code file
jsFile, err := ioutil.ReadFile("/ts/source/code/on/disk/index.tsx")
if err != nil {
    panic(err)
}
```

We are now all set to invoke the parser. Though this requires setting up a new `isolate`
and creating a few wrapper objects to be passed into the function obtained above.

```go
isolate := ctx.Isolate()
ctx.RunScript("const compilerOptions = { module: "+system+"};", "source-tree.js")

sourceFileName, err := v8.NewValue(isolate, "index.ts")
sourceCode, err := v8.NewValue(isolate, string(jsFile))
compilerOptions, _ := ctx.RunScript("compilerOptions", "source-tree.js")
booleanTrue, err := v8.NewValue(isolate, true)

// invoke the parser function
fnValue, err := fn.Call(ctx.Global(), sourceFileName, sourceCode, compilerOptions, booleanTrue)
```

Check if there was an error while parsing, and if yes, you may want to obtain relevant error
message as well as stack trace on the Javascript side.

```go
if err != nil {
    e := err.(*v8.JSError)    // JavaScript errors will be returned as the JSError struct
    fmt.Println(e.Message)    // the message of the exception thrown
    fmt.Println(e.Location)   // the filename, line number and the column where the error occured
    fmt.Println(e.StackTrace) // the full stack trace of the error, if available

    fmt.Printf("javascript error: %v", e)        // will format the standard error message
    fmt.Printf("javascript stack trace: %+v", e) // will format the full error stack trace
    return
}
```

If there was no error, `fnValue` contains the AST as an object. However, you will need 
to iterate over it to convert to a pure Go object or a strongly-typed object. It is left as
an exercise for the reader.

```go
// following shall return true to indicate it is an object
fmt.Println(fnValue.IsObject()) // returns true
```

Complete code is available in [this gist](https://gist.github.com/sangupta/070edef1bc1aec675d47eb3b44ad1b24).

In my next post we will see how we can achieve the same using [QuickJS][quickjs] and its wrapper
for Go, [QuickJS-Go][quickjs-go].

Happy Hacking.

[post]: https://sangupta.com/tech/parsing-typescript-in-java.html
[tslang]: https://www.typescriptlang.org/
[eclipse-v8]: https://github.com/eclipsesource/J2V8
[ast]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
[golang]: https://go.dev
[v8go]: https://github.com/rogchap/v8go
[quickjs-go]: github.com/quickjs-go/quickjs-go
[quickjs]: https://bellard.org/quickjs/