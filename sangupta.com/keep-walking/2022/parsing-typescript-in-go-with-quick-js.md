---
title: Parsing Typescript in Go using QuickJS
date: 26 Apr 2022
tags: 
- coding-techniques
- golang
alias:
- /tech/parsing-typescript-in-go-with-quickjs.html
---

This post is in series where I talk on how to parse Typescript code in [Java][post1]
and [Go using v8go][post2]. Instead of using [v8go][v8go], this time we will use
[QuickJS-Go][quickjs-go] to parse and obtain the [abstract syntax tree][ast].

As before, there are many use-cases on why this may be required: 
* you want to build a new documentation tool for `Javascript`/`Typescript`
* you are building a new version of [Hacker Rank][hackerrank]
* you want to enable scripting in your own code

Back to getting the job done, here are the broader steps:
* Initialize and load QuickJS
* Load Typescript JS library
* Load the Typescript code that you would like to parse
* And, finally call the TS parser code to obtain the AST

Let's dig into the details. The first step is to initialize a new 
QuickJS instance. You would notice the use of `runtime.LockOSThread()` - 
this is to ensure that QuickJS always operates in the exact same thread.

```go
// this is a must-step as per QuickJS documentation
stdruntime.LockOSThread()

// create new runtime
runtime := quickjs.NewRuntime()
defer runtime.Free()

// obtain a new context that we will work with
context := runtime.NewContext()
defer context.Free()
```

Once V8 is up, we need to load the Typescript JS code. We make use of a locally
saved `typescript.js` file for the same. Read it in memory and then use the `EvalFile`
method to load the script.

```go
tsSource, err := ioutil.ReadFile("/path/to/ts/on/disk/typescript.js")
if err != nil {
    panic(err) // panic if load failed
}

// load TS source code
result, err := context.EvalFile(string(typeScript), 0, "typescript.js")
check(err)
defer result.Free()
```

Notice the use of `check(err)` function call above. It is a convenience function
borrowed from the documentation that allows us to visit the stack/cause in case
something fails inside the QuickJS runtime. The function is as under.

```go
func check(err error) {
	if err != nil {
		var evalErr *quickjs.Error
		if errors.As(err, &evalErr) {
			fmt.Println(evalErr.Cause)
			fmt.Println(evalErr.Stack)
		}
		panic(err)
	}
}
```

Once Typescript is loaded, we need to build the compiler options to let TS know that
we would like to use the latest syntax version for parsing.

```go
// never free this - throws cgo error at app termination
globals := context.Globals()

ts := globals.Get("ts")
defer ts.Free()

scriptTarget := ts.Get("ScriptTarget")
defer scriptTarget.Free()

system := scriptTarget.Get("Latest")
defer system.Free()

args := make([]quickjs.Value, 4)
args[0] = context.String("index.ts")
args[1] = context.String(string(sourceCode))
args[2] = context.String("")
args[3] = context.Bool(true)
```

Next, obtain the function `createSourceFile` from the loaded `ts` object. This allows
us to invoke the function directly from Go.

```go
parseCode := ts.Get("createSourceFile")
defer parseCode.Free()
```

Load the typescript code that you would like to parse, and then simply use
`context.Call` to execute the parser.

```go
sourceCode, err := ioutil.ReadFile("/path/on/disk/typescript/code/index.ts")
if err != nil {
    panic(err)
}

result, err = context.Call(globals, parseCode, args)
check(err)
defer result.Free()
```

If there was no error, `result` contains the AST as an object. However, you will need 
to iterate over it to convert to a pure Go object or a strongly-typed object. It is left as
an exercise for the reader.

```go
if result.IsObject() {
    // print the property names available
    names, err := result.PropertyNames()
    check(err)

    fmt.Println("Object:")
    for _, name := range names {
        val := result.GetByAtom(name.Atom)
        defer val.Free()

        fmt.Printf("'%s': %s\n", name, val)
    }
} else {
    fmt.Println(result.String())
}
```

Complete code is available in [this gist](https://gist.github.com/sangupta/f08af23ce6816f7fad6ac88a267a1a6f)

This concludes the series on different ways to parse Typescript code in [Java using J2V8][post1], 
[Go with v8go][post2] and [Go with QuickJS][post3].

Happy Hacking.

[post1]: https://sangupta.com/tech/parsing-typescript-in-java.html
[post2]: https://sangupta.com/tech/parsing-typescript-in-go-with-v8go.html
[tslang]: https://www.typescriptlang.org/
[eclipse-v8]: https://github.com/eclipsesource/J2V8
[ast]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
[golang]: https://go.dev
[v8go]: https://github.com/rogchap/v8go
[quickjs-go]: github.com/quickjs-go/quickjs-go
[quickjs]: https://bellard.org/quickjs/
[hackerrank]: https://www.hackerrank.com/