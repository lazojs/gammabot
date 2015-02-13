[![Build Status](https://travis-ci.org/lazojs/gammabot.svg?branch=master)](https://travis-ci.org/lazojs/gammabot)

# gammabot

> It's funny but is it going to get them off their tractors?

Traces Lazo node module dependencies based on package.json meta data.

## Usage

```javascript
var gammabot = require('gammabot');

// arguments
// 1. node modules directory to be scanned
// 2. options
//    - inlcude: regex of files to include
//    - includeDir: regex to limit directories
//    - excludeDir: regex to exclude directories; default is /test/
//    - exclude: regex to exclude files
// 3. callback

gammabot('node_modules', {}, function (err, list) {
    if (err) {
        throw err;
    }

    // all lazo node modules
    console.log(list.modules);
    // module version conflicts
    console.log(list.conflicts);
});
```