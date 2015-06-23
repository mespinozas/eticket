function Tuple(/* values */) {
    var args = Array.prototype.slice.call(arguments, 0);
    this._store = new Array(args.length);
    this.pack.apply(this, args);
}

Tuple.prototype.pack = function pack(/* values */) {
    var store = this._store;
    var i = store.length;

    while (i--) {
        store[i] = arguments[i];
    }

    return this;
};

Tuple.prototype.unpack = function unpack(callback) {
    return callback.apply(this, this._store);
};

Tuple.prototype.toString = function toString() {
    return ['(', this._store.join(', '), ')'].join('');
};

Tuple.prototype.valueOf = function valueOf() {
    var store = this._store;
    var storeLength = store.length;
    var total = store[0];
    var i;

    for (i = 1; i < storeLength; i += 1) {
        total += store[i];
    }
    return total;
};

var box = new Tuple(10, 20, 15);

var volume = box.unpack(function (x, y, z) {
    return x * y * z;
});

console.log(volume); // 3000

var p1 = new Tuple(10, 20);
var p2 = new Tuple(40, 50);

console.log(p2 + p1); // true
