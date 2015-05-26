
function Flyweight (make, type, quantity) {
    this.make = make;
    this.type = type;
    this.quantity = quantity;
};
 
var FlyWeightFactory = (function () {
    var flyweights = {};

    return {

        get: function (make, type, quantity) {
            if (!flyweights[make + type]) {
                flyweights[make + type] = 
                    new Flyweight(make, type, quantity);
            }
            return flyweights[make + type];
        },

        getCount: function () {
            var count = 0;
            for (var f in flyweights) count++;
            return count;
        }
    }
})();
 
function MilkCollection () {
    var milks = {};
    var count = 0;
 
    return {
        add: function (make, type, quantity, price, idStore) {
            milks[idStore] = 
                new Milk(make, type, quantity, price, idStore);
            count++;
        },
 
        get: function (idStore) {
            return milks[idStore];
        },
 
        getCount: function () {
            return count;
        }
    };
}
 
var Milk = function (make, type, quantity, price, idStore) {
    this.flyweight = FlyWeightFactory.get(make, type, quantity);
    this.price = price;
    this.idStore = idStore;
    this.getMake = function () {
        return this.flyweight.make;
    }
    // ...
}
 
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
function run() {
    var milks = new MilkCollection();
    
    milks.add("Soprole", "Entera", "1 litro", "1000", "1234asd");
    milks.add("Soprole", "Entera", "1 litro", "1200", "1234aaa");
    milks.add("Soprole", "Entera", "1 litro", "1500", "1234bbb");
    milks.add("Soprole", "Entera", "1 litro", "1800", "1234ccc");
   
    milks.add("Soprole", "Semi-descremada", "1 litro", "1200", "1234asd");
    milks.add("Soprole", "Semi-descremada", "1 litro", "1250", "1234ttt");

    milks.add("Soprole", "Descremada", "1 litro", "2000", "12345rrr");

    milks.add("Calo", "Entera", "1 litro", "990", "1234fff");
    milks.add("Calo", "Entera", "1 litro", "890", "1234ppp");
 
    log.add("Cantidad de leche: " + milks.getCount());
    log.add("Cantidad de Flyweights: " + FlyWeightFactory.getCount());
    log.show();
}
