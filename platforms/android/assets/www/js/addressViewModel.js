'use strict';

var addressViewModel = function(){

  var self = this;

  //Domain data
  self._line1 = ko.observable();
  self._line2 = ko.observable();
  self._county = ko.observable();
  self._city = ko.observable();
  self._region = ko.observable();
  self._addressList = ko.observableArray();

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
    var url = 'http://etickettest-mespinozas.rhcloud.com:8000/api/addresses/';
    //var url = 'http://localhost:5000/api/products/';

    $.ajax({

        url: 	url,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log(data);
            self.addressList(data);
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
        }
    });
  };


  self.save = function(){
    $.ajax({
            url: "api/courses",
            type: "post",
            data: ko.toJSON(self),
            contentType: "application/json",
            success: function(data){
                console.log(data);
                //self.productList(data);
                alert("success");
             },
             error:function(jqXHR, textStatus, errorThrown) {

                console.error(xhr);
                console.error(type);
                alert("failure");
             }
       });
  };
};
