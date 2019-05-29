/*!
 * map.js
 * https://github.com/egene-huang/javascript-like.git
 * on Dec 22, 2016
 */
;
(function (global, factory) {
    //
    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("Map requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    var Map = function Map() {

        this.elements = [];

        this.keys = {};

        this.size = 0;
    } ;


//function start
    Map.prototype.length = function () {
        return this.size;
    };


    Map.prototype.isEmpty = function () {
        return this.size < 1;
    };

    Map.prototype.clear = function () {
        this.elements = [];
        this.keys = {};
        this.size = 0;
    };

//remove
    Map.prototype.remove = function (_key) {
        //
        var _k = String(_key).toString(),
            __ = this.keys[_k],
            _e;
        if (__) {
            //
            var i = __['index'];
            _e = this.elements[i];

            //delete
            delete this.elements[i];
            delete this.keys[_k];

            //update length
            this.size--;
        }

        return _e;
    };


//map.put
    Map.prototype.put = function (_key, _value) {

        //toString
        _key = String(_key).toString();

        //
        var that = this,
            obj = that.keys[_key];

        if (obj) {//update
            //
            var _i = obj['index'],
                ol = that.elements[_i];
            if (ol) {
                //
                putElement(false);
            } else {
                throw new Error(' not found elements');
            }
        } else {//add
            putElement(true);
        }


        function putElement(add) {

            //add
            if (add) {

                var v = {};
                v[_key] = _value;

                that.elements.push(v);
                //
                that.size++;
                //update index
                that.keys[_key] = {
                    'index': ((that.size) - 1)
                };
            } else {
                //update
                that.elements[_i][_key] = _value;
            }
        }

    };

    Map.prototype.get = function (_key) {
        //
        var _k = String(_key).toString(), __ = this.keys[_k];
        if (__) {
            //get
            var i = __['index'],
                t = this.elements[i];
            if (t) {
                return t[_k];
            }
        }

        return null;
    };

//get index by key
    Map.prototype.getIndex = function (_key) {
        _key = String(_key).toString();
        var __ = this.keys[_key],
            _index = -1;
        if (__) {
            //
            _index = __['index'];
        }

        return _index;
    };


//return a object
    Map.prototype.getEntry = function (_key) {
        var _k = String(_key).toString(),
            __ = this.keys[_k];
        if (__) {
            //
            var i = __['index'];
            return this.elements[i];
        }

        return null;
    };


//contains for key
    Map.prototype.containsKey = function (_key) {
        //
        var _k = String(_key).toString(),
            __ = this.keys[_k];
        if (__) {
            return true;
        }

        return false;
    };

//get all keys
    Map.prototype.keyArray = function () {
        var rt = [];
        var ko = this.keys;
        if (ko) {
            //iterator
            var ns = Object.getOwnPropertyNames(ko);
            if (ns) {
                ns.forEach(function (item, i) {
                    if (item) {
                        rt.push(item);
                    }
                });
            }
        }

        return rt;
    };


//alelements
    Map.prototype.entrySet = function (keep) {

        var alelements = this.elements || [];

        keep = keep || true; //default keep

        if (keep) {
            return alelements;
        }

        var rt = [];
        alelements.forEach(function (item, i) {
            if (item) {
                rt.push(item);
            }
        });

        return rt;

    };

    //support AMD
    if ( typeof define === "function" && define.amd ) {
        define( [], function() {
            return Map;
        });
    }


    if ( typeof noGlobal === typeof undefined) {
        window.Map = Map;
    }


    return Map ;

}));

