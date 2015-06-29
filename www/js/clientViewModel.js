'use strict';


var ClientViewModel = function (){

	var self = this;

	self._name = ko.observable();
	self._firstLastname = ko.observable();
	self._secondLastname = ko.observable();
	self._phone = ko.observable();
	self._mail = ko.observable();
	self._password = ko.observable();

	self._address: ko.observableArray({
		_line1: {type: String, required:true},
		_line2: {type: String, required:false},
		_county: {type: String, required:true},
		_city: {type: String, required:true},
		_region: {type: String, required:true}
	});

	// new properties
	self.loginAttempt = ko.observable();
	self.lockUntil = ko.observable();


//Registra un usuario
	self.save = function(){
		var url = 'https://eticket.mespinozas.com/api/clients';
		//var url = 'http://etickettest-mespinozas.rhcloud.com/api/clients';

		$.ajax({
			url: 	url,
			type: 	'POST',
			contentType: "application/json",
			data: ko.toJSON(self),
			datatype: "json",
        	processData: false,
        	success: function(data){
					//Si se crea el usuario vuelve a la página de inicio
					alert('Client registration successful');
					$("#accountCreated")[0].submit(function(e){
						e.preventDefault();
					});
			  },
			error:function(jqXHR, textStatus, errorThrown){
			     alert(errorThrown);
        }
		});
    		//alert('hello');
  	};

		//Iniciar sesión
	self.startSesion = function() {
		//Guarda los datos que escribe el usuario en variables
		var email = document.getElementById("mail").value;
		var password = document.getElementById("pass").value;
		//Guarda la password como una variable con componentes json
		var jsonPass = '{"_password":'+'"'+password+'"'+'}';
		//Busca al usuario por el mail
		//var url = 'https://etickettest-mespinozas.rhcloud.com/api/clients/'+ email ;
		var url = 'https://eticket.mespinozas.com/api/clients/'+ email ;
		$.ajax({

			url:	url,
			type: 'GET',
			datatype: "json",
			contentType: "aplication/json; charset=utf-8",
			success: function(data){
				//alert('Usuario encontrado');
				//Si la pass que escribió el usuario es igual a la pass encontrada
				if(jsonPass === JSON.stringify(data, ['_password']))
				{
					//Va a la página siguiente
					$("#loginOk")[0].submit(function(e){
						e.preventDefault();

					});
				}
				else {
					alert("Wrong username-password combination");
					//return false;
				}

			},
			error:function(jqXHR, textStatus, errorThrown){
           alert(textStatus);
			     alert(errorThrown);
			}
		});
	};
};

var vm = new ClientViewModel();
ko.applyBindings(vm,$('#main-wrapper')[0]);
