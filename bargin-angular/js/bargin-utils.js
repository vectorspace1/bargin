/**
* 	
* This is a utilities file that namespaces any functions needed by the application.
*/		
	var barginUtils = {
		getObjects: function (obj, key) {
			var objects = [];
			for (var i in obj) {
				if (!obj.hasOwnProperty(i)) continue;
				if (typeof obj[i] == 'object') {
					objects = objects.concat(this.getObjects(obj[i], key));
				} else if (i == key) {
					objects.push(obj);
				}
			}
			return objects;
		}
	};