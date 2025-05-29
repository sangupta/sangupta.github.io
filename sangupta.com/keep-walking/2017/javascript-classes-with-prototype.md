---
title: Javascript classes with `prototype`
date: 18 Aug 2017
tags: 
- just-like-that
alias:
- /tech/javascript-classes-with-prototype.html
---

[BabelJS][1] has made it quite easy to write stateful [ReactJS][2] components by
helping transpile the `class` based components into `function`'s. Classes are still
second class citizens in the Javascript world, as they are part of [ECMA Script 6][3]
which hasn't yet gained wide adoption. 

Though, this post is not about [ReactJS][2] but about classes in general. In this
post let's revisit how classes can be created in Javascript using `function`s. As a
bonus we will also see how to create a singleton using a `function`.

```js
// this function serves as the constructor
function Fruit(color) {
    this.color = color;
}

// let's add a weight parameter to the class
// and a pair of getter and setter
Fruit.prototype.setWeight = function(weight) {
    this.weight = weight;
}

Fruit.prototype.getWeight = function() {
    return this.weight;
}
```

This seems very simple as we first use a simple `function` as a constructor and then
its `prototype` to add new methods to it. However, if you would like to use inheritance
it becomes a little tricky syntax. Suppose, we want to create another class called
`Orange` that inherits from `Fruit`. This `Orange` has a constructor that takes another
attribute called `variety` along with `color`. Let's see how this is accomplished.

```js
// create another function that serves as a constructor
function Orange(color, variety) {
    // as in classes, call the super with color
    Fruit.call(this, color);

    // assign remaining attributes
    this.variety = variety;
}
```

So far, so good. However, we still need to set the prorotype chain to ensure that when 
an `Orange` is created, the methods from `Fruit` are inherited as well. For the same, we
need to set the following on `Orange`:

```js
Orange.prototype = new Fruit;
Orange.prototype.constructor = Orange;
```

And we are all set. Now if we create an `Orange` and call `setWeight()` method, it shall
work flawlessly.

```js
// create a new instance
const or = new Orange('reddish-orange', 'grapefruit');

// call any method from Fruit or Orange
or.setWeight(100); // works like a charm
or.getWeight(); // returns 100
```

Now, let's look at how to create a singleton.

```js
const Apple = new function() {
    this.type = "green apple";
    this.color = "red";
    
    this.printAsString = function() {
        return this.color + ' ' + this.type + ' apple';
    };
}
```

Instead of just declaring a normal `function`, we define and invoke an anonymous `function`
using the `new` keyword. This way the constructor to the object is no longer available to
other code, and hence, they cannot initialize the same.

Happy hacking!


[1]: https://babeljs.io
[2]: https://reactjs.org
[3]: https://262.ecma-international.org/6.0/