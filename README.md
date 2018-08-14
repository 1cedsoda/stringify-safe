# stringify-safe
Discover why you can't JSON.stringify(your_object) and automaticly remove the causes.

# Installation
```shell
npm i stringify-safe
```

# Usage
## .fixStringify()
### Basic Usage
```javascript
const StringifySafe = require('stringify-safe')
```
StringifySafe checks if `JSON.stringify(your_object)` fails.

With `.fixStringify()` the causes will be recursively determined and removed.

```javascript
var fixedObject = StringifySafe.fixStringify(brokenObject)
```

### Recursion Depth

You can manually set a maximal recusion `depth`.
The default is `10`.

`0` means recursion and if your `brokenObject` is broken `{}` will be returned.

```javascript
// depth = 5
var fixedObject = StringifySafe.fixStringify(brokenObject, 5)
```
### Printing

If you want to see wich childs fail to get stringified, set `printing` to `true`.
The default is `false`.

```javascript
// depth = 6
// printing = true
var fixedObject = StringifySafe.fixStringify(brokenObject, 5 true)
```
## .stringify()
This function is a warpper for `.fixStringify()`, but it direclty `JSON.stringify(your_object)` you object.

The parametrs are working like `.fixStringify()`.

```javascript
var fixedStrigifiedObject = StringifySafe.stringify(brokenObject)
```
## .isBroken()

This function tells you if your object is broken by returning a boolean.

```javascript
var isBroken = StringifySafe.isBroken(your_object)
```

## .hasBrokenChilds()

This function tells you if your object contains broken childs by returning a boolean.

```javascript
var hasBrokenChilds = StringifySafe.hasBrokenChilds(your_object)
```
