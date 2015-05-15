'use strict';
var resultName;
var resultFirstLastName;
var resultSecondLastName;
var resultPhone;
var resultMail;
var resultPassword;

var ClientViewModel = function (){

	var self = this;

	self._name = ko.observable();
	self._lname1 = ko.observable();
	self._lname2 = ko.observable();
	self._phone = ko.observable();
	self._mail = ko.observable();
	self._password = ko.observable();

	self.save = function(){
		var url = 'http://etickettest-mespinozas.rhcloud.com/api/clients';
		alert(self._mail);

		$.ajax({

			  url: 	url,
			  type: 	'POST',
			  data: ko.toJSON(self),
			  datatype: "json",
                    processData: false,
                    contentType: "application/json; charset=utf-8",
			  success: function(data){
				alert('User registration Succesful');
           			alert(textStatus);
			  },
			  error:function(jqXHR, textStatus, errorThrown){
			     alert(errorThrown);
        }
		});
  	};
	self.startSesion = function() {
		var email = document.getElementById("mail").value;
		var password = document.getElementById("pass").value;
		var jsonPass = '{"_password":'+'"'+password+'"'+'}';
		var url = 'http://etickettest-mespinozas.rhcloud.com/api/clients/'+ email ;
		$.ajax({

			url:	url,
			type: 'GET',
			datatype: "json",
			contentType: "aplication/json; charset=utf-8",
			success: function(data){
				//alert('Usuario encontrado');
				if(jsonPass === JSON.stringify(data, ['_password']))
				{
					//alert("hola");
					$("#loginOk")[0].submit(function(e){
						e.preventDefault();
						/*$.ajax({

							url:	$form.attr('action'),
							type: 'POST',
							cache    : false,
							success  : function(data) {
								alert(data);
							}
						});*/
					});
				}
				else {
					alert("Wrong password or Username");
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
           alert(textStatus);
			     alert(errorThrown);
			}
		});
	};
};
