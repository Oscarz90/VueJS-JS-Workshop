import Node from "@/linked-lists/doubly/node";
/**
 * Doubly linked List Data Structure
 */
export default class DoublyLinkedList{
  /**
   * Doubly Linked List Constructor
   */
  constructor(){
    this.head=undefined;
    this.tail=undefined;
    this._length=0;
  }
  /**
   * Returns the lenght of the instance list
   * @returns {int} The length of the instance list
   */
  get length(){
    return this._length;
  }
  /**
   * Adds a new Node into the list
   * @param {*} data The data to save into the new List's Node
   */
  add(data){
    if(data == undefined || data == null)
      throw "There's no data provided";
    
    const temporalNode = new Node(data);
    //Validating if the list is emtpy
    if(!this.head){
      this.head = temporalNode;
      this.tail = temporalNode;
    }else{
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
  remove(data){
    // Theres nothing to return so return undefined
    if(this.length==0 || !data)
      return undefined;

    let pivotNode=undefined;
    // In case the data is equal to the head node
    if(data === this.head.data){
      pivotNode = this.head;
      this.head=this.head.next;
      this.head.prev = undefined;
    }else{
      pivotNode = this.head.next;
      
      //Searching the node
      while(pivotNode.data !== data && pivotNode.next){
        pivotNode=pivotNode.next;
      }
      
      // If There's nothing found return undefined
      if(pivotNode.data !== data)
        return undefined;
      
      //If the node is the list's tail
      if(pivotNode === this.tail){
        this.tail = this.tail.prev;
        this.tail.next = undefined;
      }else{
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
  find(data){
    let pivotNode = this.head;
    while(pivotNode.next){
      if(pivotNode.data === data)
        return pivotNode;
      pivotNode = pivotNode.next;
    }
    return undefined;
  }
}