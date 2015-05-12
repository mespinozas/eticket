'use strict';

var ClientViewModel = function (){

	var self = this;

	self.name = ko.observable();
	self.lname1 = ko.observable();
	self.lname2 = ko.observable();
	self.phone = ko.observable();
	self.mail = ko.observable();
	self.password = ko.observable();

	/*self.Create function () {

		var url = 'http://etickettest-mespinozas.rhcloud.com/api/clients';
		var formData =  {"name":"Paolo","lname1":"Herrera","lname2":"Araya","phone":"57245468","password":"prueba1","mail":"paolo.herrera.araya@gmail.com"};
		$.ajax({

			  url: 	url,
			  type: 	'POST',
			  dataType: 'json',
			  contentType: 'application/json; charset=utf-8',
			  data: formData,
			  success: function(data){
				console.log(data);
			  },
			  error: function(request, textStatus, errorThrown){
				alert('textStatus ' + textStatus);
       			alert('errorThrown ' + errorThrown);
			  }
		});
	};*/

	self.save = function(){
		var url = 'http://etickettest-mespinozas.rhcloud.com/api/clients';
		$.ajax({

			  url: 	url,
			  type: 	'POST',
			  data: ko.toJSON(self),
			  datatype: "json",
                    processData: false,
                    contentType: "application/json; charset=utf-8",
			  success: function(data){
				//alert('Datos ingresados exitosamente');
			  },
			  error:function(jqXHR, textStatus, errorThrown){
           alert(textStatus);
			     alert(errorThrown);
        }
		});
    		//alert('hello');
  };
};
