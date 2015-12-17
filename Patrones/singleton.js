var mySingleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }
 
    var privateVariable = "Im also private";
 
    var privateRandomNumber = Math.random();
 
    return {
 
      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
 
      publicProperty: "I am also public",
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  };
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();
 
var myBadSingleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    var privateRandomNumber = Math.random();
 
    return {
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  };
 
  return {
 
    // Always create a new Singleton instance
    getInstance: function () {
 
      instance = init();
 
      return instance;
    }
 
  };
 
})();
 
 
// Usage:
 
 
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
function run() {
	var singleA = mySingleton.getInstance();
	var singleB = mySingleton.getInstance();
	var res1 = singleA.getRandomNumber() === singleB.getRandomNumber();
	log.add("Buen Singleton: " +  res1); // true
 
	var badSingleA = myBadSingleton.getInstance();
	var badSingleB = myBadSingleton.getInstance();
	var res2 = badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ;
	log.add("Mal Singleton: " +  res2);
    //log.add("Cantidad de leche: " + milks.getCount());
    //log.add("Cantidad de Flyweights: " + FlyWeightFactory.getCount());
    log.show();
}
