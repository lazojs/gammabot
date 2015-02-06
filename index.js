var dir = require('node-dir');
var path = require('path');
var _ = require('lodash');

module.exports = function (modulesDir, callback) {
    var index = 0;
    var modules = [];

    dir.readFiles(path.resolve(modulesDir), { match: /package.json$/ }, function (err, content, next) {
        if (err) {
            callback(err, null);
        }

        try {
            content = JSON.parse(content);
        } catch (e) {
            callback(e, null);
        }

        if (content.lazo) {
            modules.push({
                name: content.name,
                version: content.version,
                lazo: content.lazo,
                data: content,
                index: index
            });
        }

        index++;
        next();
    }, function (err, files) {
            if (err) {
                callback(err, null);
            }
            var retVal = {};
            var groupedBy;

            retVal.modules = modules.map(function (module) {
                module.path = files[module.index].substr(0, files[module.index].lastIndexOf(path.sep));
                delete module.index;
                return module;
            });

            groupedBy = _.groupBy(retVal.modules, function (module) {
                return module.name;
            });

            retVal.conflicts = {};
            for (var k in groupedBy) {
                if (groupedBy[k].length > 1) {
                    retVal.conflicts[k] = groupedBy[k];
                }
            }

            callback(null, retVal);
    });
};