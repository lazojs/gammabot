var gammabot = require('../index');
var chai = require('chai');

describe('gammabot', function () {

    it('should get module data for lazo node modules', function (done) {
        gammabot('test/application/node_modules', function (err, list) {
            if (err) {
                throw err;
            }

            chai.expect(list.modules.length).to.be.equal(4);
            chai.expect(list.conflicts['cmp-b']).to.be.Array;
            chai.expect(list.conflicts['cmp-b'].length).to.be.equal(2);
            done();
        });
    });

});