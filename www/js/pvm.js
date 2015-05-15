'use strict';

var resultName;
var resultPrice;
var resultCode;

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

function init() {
    //var pvm=new ProductViewModel();
    //pvm.getAll();

    document.querySelector("#startScanProduct").addEventListener("touchend", startScanProducts, false);
	resultCode = document.querySelector("#code");
	resultName = document.querySelector("#name");
	resultPrice = document.querySelector("#price");

}

var ProductViewModel = function(){

  var self = this;
	//document.addEventListener("deviceready", getAll, false);
  //Domain data
  self._name = ko.observable().extend({ defaultIfNull: "Store" });
  self._price = ko.observable().extend({ defaultIfNull: "Store" });
  self._code = ko.observable().extend({ defaultIfNull: "Store" });
  self._productList = ko.observableArray();

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

  self.showCreate = function(){
    self.isCreateMode(true);
    self.isEditMode(false);
  };

  self.showEdit = function(){
    self.isCreateMode(false);
    self.isEditMode(true);
  };

  self.getAll = function(){
    var url =  'http://etickettest-mespinozas.rhcloud.com/api/products/';
		alert('hello all');
    $.ajax({

        url: 	url,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log(data);
            self._productList(data);
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

  this.getProductByCode = function(code){
  var uri = 'http://etickettest-mespinozas.rhcloud.com/api/products/'+code;

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
                      resultPrice.value=data._price;
                      resultCode.value=data._code;
                      //resultAddress.value=data._address;
                      //self._id(data._id);
          //alert('Reading Data Done');
      },
      error: function(xhr, type){
                      alert('Producto No Encontrado');
                      console.error(xhr);
                      //alert(type);
          console.error(type);
                      //alert('Reading Error');
      }
  });
};

ko.applyBindings(new ProductViewModel());

function startScanProducts() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var svm = new ProductViewModel();
            svm.getProductByCode(result.text);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
