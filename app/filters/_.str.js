angular.module('dellUi').filter('_.str', function() {
    // Examples: 
    // Simple {{ string_variable | _.str:'capitalize' }}
    // multiple {{ string_variable | _.str:'capitalize,titleize' }}
    // To use filter with parameters such as _.str.prune("whatever string",10) : {{ string_variable | _.str:'prune':10 }}
    return function(str, fn, params) {
		str = str || '';
		params = params || [];
		//params.unshift(str);
		fn = fn.replace(/ /g,"").split(",");//strip white spaces
		if(fn.length) {
			_.each(fn, function(func){
				str = _.str[func](str, params);
			});  
			return str;      
		} else {
			return str;
		}     
    };
});