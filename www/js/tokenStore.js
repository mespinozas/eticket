'use strict';

var AndroidStoreStrategy = function() {
    var self = this,
        fileName = 'preferences',
        mode = 'MODE_PRIVATE',
        key = 'token';

    sharedpreferences.getSharedPreferences(fileName, mode,  function(){
        console.log('created shared preferences');
    },
    function(){
        console.log('error creating shared preferences');
    });

    self.saveToken = function (token, cb) {

        sharedpreferences.putString('token', token,
                                    function(){
            console.log('token saved in preferences');
            cb();

        }, function(err){
            console.log('token saved error in preferences.' + err);
            cb(err);
        });
    };

    self.getToken = function (cb) {

        sharedpreferences.getString('token',
                                    function(result){
            console.log('token getted from preferences');
            cb(null, result);
        }, function(err){
            console.log('token getted error in preferences.' + err);
            cb(err);
        });
    };
}

var IosStoreStrategy = function() {

    self.saveToken = function (token, cb) {
        throw new Error('NOT YET IMPLEMENTED');
    };

    self.getToken = function (cb) {
        throw new Error('NOT YET IMPLEMENTED');
    };
}

function TokenStore(strategy) {
    var self = this;
    self.setStrategy = function(newStrategy){
        console.log('strategy for tokenStore: ' + newStrategy);
        if (newStrategy === 'Android'){
            self.strategy = new AndroidStoreStrategy();
        }
        if (newStrategy === 'IOS'){
            self.strategy = new IosStoreStrategy();
        }
    };

    self.saveToken = function (token, callback) {
        self.strategy.saveToken(token, callback);
    };

    self.getToken = function (callback) {
        self.strategy.getToken(callback);
    };
}
