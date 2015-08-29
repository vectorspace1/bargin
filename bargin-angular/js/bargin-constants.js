/**
* 	
* This file contains the constants used throughout the application.
*/	
	
	var CLIENT_ID = "xyzete"; // Retrieve this key from the developer portal
	var CLIENT_SECRET = "zigs"; // Retrieve this key also from the developer portal
	
	//var BASE_URL = "https://api.apigee.com"; // HTTPS url
	var BASE_URL = "https://api.usergrid.com/sean.williams.11/barterme"; // HTTPS url
	var BASE_URL_LOGIN = "/token";
	var BASE_URL_GET_TOKEN = BASE_URL + "/v1/oauth2/token?grant_type=client_credentials";
	//var BASE_URL_LOGIN = BASE_URL + "/v1/oauth2/auth/login";
	var BASE_URL_LOGOUT = BASE_URL + "/v1/oauth2/auth/logout";
	var BASE_FHIR_INFO_URL = BASE_URL + "/v1/fh";
	var BASE_URL_PATIENT = BASE_FHIR_INFO_URL + "/Pat/";
	var BASE_URL_ORGANIZATION = BASE_FHIR_INFO_URL + "/Org/";
	var BASE_URL_OBSERVATION = BASE_FHIR_INFO_URL + "/Obser";
	
	var GLUCOSE_LOINC = "2339-0";