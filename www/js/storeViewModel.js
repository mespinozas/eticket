'use strict';
var resultDiv;
var resultUrl;

document.addEventListener("deviceready", init, false);

function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	resultDiv = document.querySelector("#results");
  resultUrl = document.querySelector("#url");
};

var StoreViewModel = function(){
  var self = this;

  self.name = ko.observable('undefined');
  self.lat = ko.observable();
  self.lon = ko.observable();
  self.address = ko.observable('');

	self._id = ko.observable();

	self.storeList = ko.observableArray();
  //Behaviour

	self.isEditMode = ko.observable(false);
  self.isCreateMode = ko.observable(false);


  self.showList = function(){
    self.getAll();
  };

  self.ajax = function(uri, method, data) {
      var request = {
          url: uri,
          type: method,
          contentType: "application/json",
          accepts: "application/json",
          cache: false,
          dataType: 'json',
          data: JSON.stringify(data),
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization",
                  "Basic " + btoa(self.username + ":" + self.password));
          },
          success: function(data){
              console.log(data);
              self = JSON.parse(data);
          },
          error: function(jqXHR) {
              console.log("ajax error " + jqXHR.status);
          }
      };
      return $.ajax(request);
  };

  self.getAll = function(uri){
    var url = uri ||'http://etickettest-mespinozas.rhcloud.com:8000/api/stores/';
		alert(url);
    $.ajax({
        url: 	url,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            alert('Take');
            self.storeList(data);
						alert('Collect');
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
						alert('Error');
        }
    });
  };

  self.get = function(uri){
		//var uri = 'http://etickettest-mespinozas.rhcloud.com:8000/api/products/';
    $.ajax({
        url: 	uri,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log(data);
            self =JSON.parse(data);
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
        }
    });
  };
	self.save = function(){
    alert('hello');
  };

  self.getStoreById = function(id){
    var uri = 'http://etickettest-mespinozas.rhcloud.com/api/stores/'+id;

    $.ajax({
        url: 	uri,
        type: 'GET',
        dataType: 'json',
        //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
						//alert('Reading Before Data');
						console.log(data);
            //alert('Reading Before Data');
            self.name(data.name);
						self.lat(data.lat);
						self.lon(data.lon);
						self.address(data.address);
						//self._id(data._id);
            alert('Reading Data Done');
        },
        error: function(xhr, type){
						//alert(xhr);
						console.error(xhr);
						//alert(type);
            console.error(type);
						//alert('Reading Error');
        }
    });
  };
};
ko.applyBindings(StoreViewModel);
//ko.applyBindings(new StoreViewModel(), $('#storeInfo')[0]);

function startScan() {

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;
      resultUrl.value=result.text;
      alert('Reading Before');
			//esto no lo hace
      var svm = new StoreViewModel();
			alert('Reading Before Get All');
			//svm.save();
      svm.getStoreById(result.text);
      alert('Reading After');
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
