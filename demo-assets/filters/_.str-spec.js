describe('.str', function() {

	beforeEach(module('demo'));

	it('Testing filter _.str: it should ...', inject(function($filter) {

        var filter = $filter('.str');

		expect(filter('input')).toEqual('output');

	}));

});