'use strict';
var resultDiv;
var resultUrl;
var resultName;
var resultLat;
var resultLon;
var resultAddress;

document.addEventListener("deviceready", init, false);

function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	resultDiv = document.querySelector("#results");
  //resultUrl = document.querySelector("#url");
	resultName = document.querySelector("#name");
	resultLat = document.querySelector("#lat");
	resultLon = document.querySelector("#lon");
	resultAddress = document.querySelector("#address");
};

ko.extenders.defaultIfNull = function(target, defaultValue) {
    var result = ko.computed({
        read: target,
        write: function(newValue) {
            if (!newValue) {
                target(defaultValue);
            } else {
                target(newValue);
            }
        }
    });

    result(target());

    return result;
};

var StoreViewModel = function(){
 	var self = this;

	self._name = ko.observable().extend({ defaultIfNull: "Store" });;
	self._lat = ko.observable().extend({ defaultIfNull: 0 });;
	self._lon = ko.observable().extend({ defaultIfNull: 0 });;
	self._address = ko.observable().extend({ defaultIfNull: "Address" });;
	self._storeList = ko.observableArray();
	self._id = ko.observable().extend({ defaultIfNull: 0 });;
	//self._isEditMode = ko.observable(false);
	//self._isCreateMode = ko.observable(false);

	self.showList = function(){
		self.getAll();
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

  /*self.get = function(uri){
		//var uri = 'http://etickettest-mespinozas.rhcloud.com:8000/api/products/';
    $.ajax({
        url: 	uri,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log(data);
						this =JSON.parse(data);
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
        }
    });
  };*/

	this.getStoreById = function(id){
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
						//self._name(data._name);
						//self._lat(data._lat);
						//self._lon(data._lon);
						//self._address(data._address);

						resultName.value=data._name;
						resultLat.value=data._lat;
						resultLon.value=data._lon;
						resultAddress.value=data._address;
						//self._id(data._id);
            //alert('Reading Data Done');
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
ko.applyBindings(new StoreViewModel());
//ko.applyBindings(new StoreViewModel(), $('#storeInfo')[0]);

function startScan() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			//var s = "Result: " + result.text + "<br/>" +
			//"Format: " + result.format + "<br/>" +
			//"Cancelled: " + result.cancelled;
			//resultDiv.innerHTML = s;
      //resultUrl.value=result.text;
      //alert('Reading Before');
			//esto no lo hace
      var svm = new StoreViewModel();
			//alert('Reading Before Get All');
			//svm.save();
      svm.getStoreById(result.text);
      //alert('Reading After');
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
