'use strict';
var resultDiv;
var resultUrl;

document.addEventListener("deviceready", init, false);
function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	resultDiv = document.querySelector("#results");
  resultUrl = document.querySelector("#url");
}

var StoreViewModel = function(){

  var self = this;

  //Domain data
  self.name = ko.observable();
  self.lat = ko.observable();
  self.lon = ko.observable();
  self.address = ko.observable();
  self._id = ko.observable();
  self.stores = ko.observableArray();
  //Behaviour
  self.isEditMode = ko.observable(false);
  self.isCreateMode = ko.observable(false);

  self.isCreateAndEditVisible = ko.computed(function(){
    return self.isEditMode() || self.isCreateMode();
  }, self);

  self.isListVisible = ko.computed(function(){
    return !self.isEditMode() && !self.isCreateMode();
  }, self);

  self.isDeleteVisible = ko.computed(function(){
    return self.isEditMode();
  }, self);

  self.showList = function(){
    self.isCreateMode(false);
    self.isEditMode(false);
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
  }

  self.getAll = function(){
    var uri = 'http://etickettest-mespinozas.rhcloud.com:8000/api/products/';
    $.ajax({
        url: 	uri,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log(data);
            self.productList(data);
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
        }
    });
  };

  self.get = function(url){
    self.ajax(url, 'GET');
  };

  self.getStoreById = function(url){
    alert('Reading');
    //var url = 'http://etickettest-mespinozas.rhcloud.com:8000/api/products/'+id;
    $.ajax({
        url: 	url,
        type: 	'GET',
        dataType: 'json',
        //data: id;
        //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function(data){
            console.log(data);
            alert('Reading Before Data');
            self = JSON.parse(data);
            alert('Reading Data');
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
        }
    });
  };
};

ko.applyBindings(new StoreViewModel(), $('#storeInfo')[0]);

function startScan() {

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;
      resultUrl.value=result.text;
      alert('Reading Before');
      var svm = new StoreViewModel();
      svm.get(result.text);
      alert('Reading After');
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
