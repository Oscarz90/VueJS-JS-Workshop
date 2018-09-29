"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Doubly linked List Data Structure
 */
var DoublyLinkedList = function () {
  /**
   * Doubly Linked List Constructor
   */
  function DoublyLinkedList() {
    _classCallCheck(this, DoublyLinkedList);

    this.head = undefined;
    this.tail = undefined;
    this._length = 0;
  }
  /**
   * Returns the lenght of the instance list
   * @returns {int} The length of the instance list
   */


  _createClass(DoublyLinkedList, [{
    key: "add",

    /**
     * Adds a new Node into the list
     * @param {*} data The data to save into the new List's Node
     */
    value: function add(data) {
      if (data == undefined || data == null) throw "There's no data provided";

      var temporalNode = new _node2.default(data);
      //Validating if the list is emtpy
      if (!this.head) {
        this.head = temporalNode;
        this.tail = temporalNode;
      } else {
        this.tail.next = temporalNode;
        this.tail.next.prev = this.tail;
        this.tail = temporalNode;
      }
      //Incrementing the length after add the new node
      this._length++;
    }
    /**
     * Removes a node from the list
     * @param {*} data The Node to find 
     * @returns {Node} The Node deleted
     * FIXME:
     * - Use the class method "find" to search 
     *   the node to delete instead of using the while sentence
     */

  }, {
    key: "remove",
    value: function remove(data) {
      // Theres nothing to return so return undefined
      if (this.length == 0 || !data) return undefined;

      var pivotNode = undefined;
      // In case the data is equal to the head node
      if (data === this.head.data) {
        pivotNode = this.head;
        this.head = this.head.next;
        this.head.prev = undefined;
      } else {
        pivotNode = this.head.next;

        //Searching the node
        while (pivotNode.data !== data && pivotNode.next) {
          pivotNode = pivotNode.next;
        }

        // If There's nothing found return undefined
        if (pivotNode.data !== data) return undefined;

        //If the node is the list's tail
        if (pivotNode === this.tail) {
          this.tail = this.tail.prev;
          this.tail.next = undefined;
        } else {
          pivotNode.prev.next = pivotNode.next;
          pivotNode.next.prev = pivotNode.prev;
        }
        this._length--;
      }
      return pivotNode;
    }

    /**
     * Looks for a given node within the instance list
     * @param {*} data  
     * @returns {Node} The Node found
     */

  }, {
    key: "find",
    value: function find(data) {
      var pivotNode = this.head;
      while (pivotNode.next) {
        if (pivotNode.data === data) return pivotNode;
        pivotNode = pivotNode.next;
      }
      return undefined;
    }
  }, {
    key: "length",
    get: function get() {
      return this._length;
    }
  }]);

  return DoublyLinkedList;
}();

exports.default = DoublyLinkedList;