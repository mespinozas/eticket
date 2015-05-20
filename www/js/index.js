/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 //var ln = require('./ln');
//window.addEventListener('push', checkPage);

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		//console.log(navigator.globalization);
        //var cl = new ClientViewModel();
        //ko.applyBindings(cl, $('#main-wrapper')[0]);



        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);\
        navigator.globalization.getPreferredLanguage(
            function (language) {alert('language: ' + language.value + '\n');},
            function () {alert('Error getting language\n');}
        );
        //ln.init();
        var opts = {
            getAsync: true, lng: "es", fallbackLng: 'en'
        };

        i18n.init(opts).done(function() {
            //alert('getting language\n');
            var x = $.t("login.register");
        });
        //$("#login").i18n();
        $("#register").i18n();
    }
};



app.initialize();
//
// var checkPage = function(){
//
//     var elm = document.getElementsByClassName("content")[0];
//     var script = elm.id;
//
//     if(script) {
//         $.getScript("js/"+elm.id+".js")
//         .done(function( script, textStatus ) {
//            console.log( textStatus );
//         })
//         .fail(function( jqxhr, statusText, errorThrown ) {
//             console.log(errorThrown);
//             console.log(statusText);
//             console.log(jqxhr);
//         });
//
//         $.getScript("js/ratchet.min.js")
//         .done(function( script, textStatus ) {
//            console.log( textStatus );
//         })
//         .fail(function( jqxhr, statusText, errorThrown ) {
//             console.log(errorThrown);
//             console.log(statusText);
//             console.log(jqxhr);
//         });
//         $.getScript("js/index.js")
//         .done(function( script, textStatus ) {
//            console.log( textStatus );
//         })
//         .fail(function( jqxhr, statusText, errorThrown ) {
//             console.log(errorThrown);
//             console.log(statusText);
//             console.log(jqxhr);
//         });
//         $.getScript("js/jquery-2.1.3.min.js")
//         .done(function( script, textStatus ) {
//            console.log( textStatus );
//         })
//         .fail(function( jqxhr, statusText, errorThrown ) {
//             console.log(errorThrown);
//             console.log(statusText);
//             console.log(jqxhr);
//         });
//         $.getScript("js/knockout-3.3.0.js")
//         .done(function( script, textStatus ) {
//            console.log( textStatus );
//         })
//         .fail(function( jqxhr, statusText, errorThrown ) {
//             console.log(errorThrown);
//             console.log(statusText);
//             console.log(jqxhr);
//         });
//     }
// };
