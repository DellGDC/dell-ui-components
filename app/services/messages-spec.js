describe('messages', function() {

    beforeEach(module('dellUiSite'));

    it('Messages content should be defined and valid json.', inject(function(messages) {
        var validJSON;
        try {
            validJSON = JSON.parse(JSON.stringify(messages));
            validJSON = true;
        } catch (err) {
            validJSON = false;
        }
        expect(validJSON).toBe(true);

    }));

});