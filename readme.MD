# sow
__/səʊ/__ (verb)
1. plant (seed) by scattering it on or in the earth.
2. disseminate or introduce (something undesirable).

This package lets you compress a folder into a readable file, and expand that file to a folder again.

##  Getting Started
### Prerequisites
You need [NodeJS](https://nodejs.org/en/download/) (Version 10 or greater) on your computer.


### Settings
Sample settings.js file:
```
module.exports = {
  numbers: {
    "XXXXXXXXX": "Someone",
    "YYYYYYYYY": "Someone Else"
  },
  numberSeperator: "--------------------------------",
  fileIdentifier: ["-------------!- ", " -!-------------"],
  spacing: [2,3],
  ignore: []
}
```

### Usage
#### To create single file from input folder
```
npx sown compress <folder> -s <settings-file>
```

#### To create output folder from single file
```
npx sown expand <file> -o <folder> -s <settings-file>
```
Please do not forget to clear output folder before expanding another file.

### Limitages
- Please do not use short __fileIdentifier__.
- Only use _UTF-8_ Files when compressing.
- Use the same _settings.js_ file while expanding.

## Built With

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine

## Authors

* **Ata Gülalan** - *Initial work* - [atagulalan](https://github.com/atagulalan)

## Acknowledgments

- You CANNOT use joined __fileIdentifier__ as __numberSeperator__.
- Keep it simple or encounter with an error.

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
