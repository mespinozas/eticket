'use strict';

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

function addressValueViewModel(data) {
    var self = this;
    self._line1 = ko.observable(data._line1);
    self._line2 = ko.observable(data._line2);
    self._county = ko.observable(data._county);
	self._city = ko.observable(data._city);
	self._region = ko.observable(data._region);
}

var ClientViewModel = function (){

	var self = this;
    self._id = ko.observable().extend({ defaultIfNull: "" });
	self._name = ko.observable().extend({ defaultIfNull: "" });
	self._firstLastname = ko.observable().extend({ defaultIfNull: "" });
	self._secondLastname = ko.observable().extend({ defaultIfNull: "" });
	self._phone = ko.observable().extend({ defaultIfNull: "" });
	self._mail = ko.observable().extend({ defaultIfNull: "" });
	self._password = ko.observable().extend({ defaultIfNull: "" });

	self._address = ko.observableArray([]);

	// new properties
	self.loginAttempt = ko.observable();
	self.lockUntil = ko.observable();

	self.addAddressList = function(list) {
        ko.utils.arrayForEach(list, function(item) {
            self._address.push(new addressValueViewModel(item));
        });
    }


    //User  Register
	self.save = function(){
		var url = 'https://eticket.mespinozas.com/api/clients';

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

	//User start Session
	self.startSession = function() {
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

    self.edit = function(){
		var url = 'https://eticket.mespinozas.com/api/clients/'+ _id ;
		//var url = 'http://etickettest-mespinozas.rhcloud.com/api/clients';

		$.ajax({
			url: 	url,
			type: 	'PUT',
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
  	};
};

var vm = new ClientViewModel();
ko.applyBindings(vm,$('#main-wrapper')[0]);
