describe('GuideCtrl', function() {

	beforeEach(module('demo'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('GuideCtrl', {$scope: scope});
    }));	

	it('Testing GuideCtrl: it should ...', inject(function() {

		expect(1).toEqual(1);
		
	}));

});