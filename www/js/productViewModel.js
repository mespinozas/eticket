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
		alert('Lista');
	}

	try {
		document.querySelector("#loadProducts").addEventListener("touchend", loadProductList, false);
	} catch (e) {
		alert('Scan');
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

	self._name = ko.observable().extend({ defaultIfNull: "Store" });
	self._price = ko.observable().extend({ defaultIfNull: 0 });
	//self._code = ko.observable().extend({ defaultIfNull: 0 });
	self._code = ko.observable().extend({ defaultIfNull: "Code" });
	self._productList = ko.observableArray();
	self._id = ko.observable().extend({ defaultIfNull: 0 });
	//self._isEditMode = ko.observable(false);
	//self._isCreateMode = ko.observable(false);

	self.showList = function(){
		self.getAll();
  };

  self.getAll = function(uri){
    var url = uri ||'http://etickettest-mespinozas.rhcloud.com/api/products/';
		alert(url);
    $.ajax({
        url: 	url,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            alert('Take');

			//self.value=data._name;
			//self.value=data._code;
			//self.value=data._price;
			self._productList(data);
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

	this.getProductById = function(id){
    var uri = 'http://etickettest-mespinozas.rhcloud.com/api/products/'+id;

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
						resultCode.value=data._code;
						resultPrice.value=data._price;
						//resultAddress.value=data._address;
						//self._id(data._id);
            //alert('Reading Data Done');
        },
        error: function(xhr, type){
						alert('Producto No Encontrada');
						console.error(xhr);
						//alert(type);
            console.error(type);
						//alert('Reading Error');
        }
    });
  };
};

var svm = new ProductViewModel();
ko.applyBindings(svm,$('#main-wrapper')[0]);

function startScanProduct() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			//var svm = new ProductViewModel();
      		svm.getProductById(result.text);
			//ko.applyBindings(svm);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
function loadProductList() {
	//var svm = new ProductViewModel();
    svm.getAll();
	//ko.applyBindings(svm);
}
