'use strict';

var resultName;
var resultPrice;
var resultCode;
//var resultAddress;

document.addEventListener("deviceready", init, false);



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

  self.getAll = function(client){
    var url = 'http://etickettest-mespinozas.rhcloud.com/api/addresses/';
		alert(url);
    $.ajax({
        url: 	url,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            alert('Take');
			self._productList(data);
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
			alert('Error');
        }
    });
  };

	this.getAddressById = function(id){
    var uri = 'http://etickettest-mespinozas.rhcloud.com/api/products/'+id;
    $.ajax({
        url: 	uri,
        type: 'GET',
        dataType: 'json',
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

var vm = new AddressViewModel();
ko.applyBindings(vm,$('#main-wrapper')[0]);

function init() {
	try {
		document.querySelector("#startScanProducts").addEventListener("touchend", startScanProduct, false);
	} catch (e) {
		alert('Lista');
	}

	try {
		document.querySelector("#loadAddress").addEventListener("touchend", loadProductList, false);
	} catch (e) {
		alert('Scan');
	}
  //resultUrl = document.querySelector("#url");
	resultName = document.querySelector("#name");
	resultPrice = document.querySelector("#price");
	resultCode = document.querySelector("#code");
	//resultAddress = document.querySelector("#address");
};

function startScanProduct() {
	vm.getAddressById(result.text);
}

function loadProductList() {
    vm.getAll();
}
