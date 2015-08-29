/**
*
* Each of the directives below corresponds to one of the fields in the UI.	
*/	
	bargin.directive('ngStatus', function () {
		return {
			template: '{{status}}'
		}
	});
	
	bargin.directive('ngGender', function () {
		return {
			template: '{{gender}}'
		}
	});

	bargin.directive('ngNames', function () {
		return {
			template: '{{names}}'
		}
	});
	
	bargin.directive('ngPhones', function () {
		return {
			template: '{{phones}}'
		}
	});
	
	bargin.directive('ngAddresses', function () {
		return {
			template: '{{addresses}}'
		}
	});
	bargin.directive('ngBirthdate', function () {
		return {
			template: '{{birthDate}}'
		}
	});
	
	bargin.directive('ngOrganization', function () {
		return {
			template: '{{organization}}'
		}
	});
	
	bargin.directive('ngTotalresults', function () {
		return {
			template: '<strong>{{total_results}}</strong>'
		}
	});
	
	bargin.directive('ngNograph', function () {
		return {
			template: '<strong>{{nograph}}</strong>'
		}
	});
	