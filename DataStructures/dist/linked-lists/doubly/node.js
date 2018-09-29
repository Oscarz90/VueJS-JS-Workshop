"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Node class for doubly linked list
 */
var Node = function () {
  /**
   * The Node's Constructor
   * @param {*} data 
   */
  function Node(data) {
    _classCallCheck(this, Node);

    this._data = data;
    this.next = undefined;
    this.prev = undefined;
  }
  /**
   * Returns the data of this node instance.
   * @returns {*} The Node's data
   */


  _createClass(Node, [{
    key: "data",
    get: function get() {
      return this._data;
    }
  }]);

  return Node;
}();

exports.default = Node;