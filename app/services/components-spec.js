describe('dellUiComponents', function() {

  beforeEach(module('dellUi'));

    it('dellUiComponents should be defined and valid json.', inject(function(dellUiComponents) {
        var validJSON;
        try {
            validJSON = JSON.parse(JSON.stringify(dellUiComponents));
            validJSON = true;
        } catch (err) {
            validJSON = false;
        }
        expect(validJSON).toBe(true);

    }));

});