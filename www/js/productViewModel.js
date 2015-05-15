'use strict';

var resultName;
var resultPrice;
var resultCode;
//var resultAddress;

document.addEventListener("deviceready", init, false);

function init() {
	try {
		document.querySelector("#startScanProducts").addEventListener("touchend", startScanProduct, false);
	} catch (e) {
	}

	try {
		document.querySelector("#loadProducts").addEventListener("touchend", loadProductList, false);
	} catch (e) {
	}
  //resultUrl = document.querySelector("#url");
	resultName = document.querySelector("#name");
	resultPrice = document.querySelector("#price");
	resultCode = document.querySelector("#code");
	//resultAddress = document.querySelector("#address");
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

var ProductViewModel = function(){
 	var self = this;

	self._name = ko.observable().extend({ defaultIfNull: "" });
	self._price = ko.observable().extend({ defaultIfNull: "" });
	self._code = ko.observable().extend({ defaultIfNull: "" });
	self._productList = ko.observableArray();
	self._id = ko.observable().extend({ defaultIfNull: "" });

	self.showList = function(){
		self.getAll();
  };

  self.getAll = function(){
    var url = 'http://etickettest-mespinozas.rhcloud.com/api/products/';
    $.ajax({
        url: 	url,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
			self._productList(data);
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
						alert('Empty Product List');
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

	this.getProductById = function(id){
    var uri = 'http://etickettest-mespinozas.rhcloud.com/api/products/'+id;
    $.ajax({
        url: 	uri,
        type: 'GET',
        dataType: 'json',
        //contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
			console.log(data);
			resultName.value=data._name;
			resultCode.value=data._code;
			resultPrice.value=data._price;
        },
        error: function(xhr, type){
			alert('Product Not Found');
			console.error(xhr);
            console.error(type);
        }
    });
  };
};

var svm = new ProductViewModel();
ko.applyBindings(svm,$('#main-wrapper')[0]);

function startScanProduct() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {
      		svm.getProductById(result.text);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
function loadProductList() {
    svm.getAll();
}
