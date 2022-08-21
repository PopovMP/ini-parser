# A Simple INI Parser

Parser an INI formatted string to JSON.
Allow arbitrary texts in groups and keys.
Allow leading spaces.
Parses integer and float numbers, booleans, and null.

Input:
```ini
;; Global fields
    global = foo
    let another_Global-var = 3.14
    
    ; Arbitrary text in group
[may group]
    gr-42 = 42
    boolean = true
    falsy = False
    nil = null
    
    ; Empty string value
PascalCase=
; Negative float number
  negative = -2.2
    [Other_group]
    my long variable = this is a long text
```

Usage:
```js
const {parse} = require('@popovmp/ini-parser')
const output = parse(input)
```

Output:

```json
{
  "global": "foo",
  "letAnotherGlobalVar": 3.14,
  "mayGroup": {
    "gr42": 42,
    "boolean": true,
    "falsy": false,
    "nil": null,
    "pascalCase": "",
    "negative": -2.2
  },
  "otherGroup": {
    "myLongVariable": "this is a long text"
  }
}
```
