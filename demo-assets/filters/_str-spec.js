describe('_str', function() {

	beforeEach(module('demo'));

	it('Testing filter _str: it should ...', inject(function($filter) {

        var filter = $filter('_str');

		expect(filter('input')).toEqual('output');

	}));

});