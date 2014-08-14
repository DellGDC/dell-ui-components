describe('.str', function() {

	beforeEach(module('dellUi'));

	it('should ...', inject(function($filter) {

        var filter = $filter('.str');

		expect(filter('input')).toEqual('output');

	}));

});