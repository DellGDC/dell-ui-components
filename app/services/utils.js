angular.module('dellUiSite').factory('utils',function($http,$q) {

	var utils = {
		getJSON: function(url, callback){
            //$http.jsonp(url+"?callback=JSON_CALLBACK").success(function(data, status) {
            $http.get(url).success(function(data, status) {
                // send the data back
                // to the callback function
                callback(data);
            });
        },
        store: function(key,value){
        	var sherpaStore = {};
        	if(localStorage.__sherpa_manager__) {
        		sherpaStore = JSON.parse(atob(localStorage.__sherpa_manager__));
        	}

        	if(!value) {
        		if(_.isUndefined(value)) {
        			//return stored value
        			return sherpaStore[key];
        		} else if(_.isNull(value)) {
        			//if null is passes it is interpreted as a command to delete stored element
        			delete sherpaStore[key];
        		}
        	} else {
        		//when value is present a store action takes place
        		sherpaStore[key] = value;
        		//stored object is stringified as string and base64 encoded
        		localStorage.__sherpa_manager__ = btoa(JSON.stringify(sherpaStore));
        	}
        }
	};
	return utils;
});