/**
 * Node class for doubly linked list
 */
export default class Node{
  /**
   * The Node's Constructor
   * @param {*} data 
   */
  constructor(data){
    this._data=data;
    this.next = undefined;
    this.prev = undefined;
  }
  /**
   * Returns the data of this node instance.
   * @returns {*} The Node's data
   */
  get data(){
    return this._data;
  }
}