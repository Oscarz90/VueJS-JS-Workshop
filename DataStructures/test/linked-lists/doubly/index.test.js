import {expect} from "chai";
import DoublyLinkedList from '@/linked-lists/doubly';

describe('When I make a instance of DoublyLinkedList', () => {
  const list= new DoublyLinkedList();
  
  it('It Should be an instance of  DoublyLinkedList', () => {
    expect(list).to.be.an.instanceOf(DoublyLinkedList);
  });

  it('It length should be 0',()=>{
    expect(list.length).to.be.equal(0)
  })

  it('Its head should be undefined',()=>{
    expect(list.head).to.be.undefined
  })

  it('Its tail should be undefined',()=>{
    expect(list.tail).to.be.undefined
  })
});
/**
 * Validates:
 * Operations add, remove, addAt, removeAt, find
 */
describe('When a Doubly Linked List is created',()=>{
  const list= new DoublyLinkedList();
  /**
   * Testing The Add Operation
   */
  describe('#Adding Nodes',()=>{
    it('If I add a Node the new lenght should be 1',()=>{
      list.add("1")
      expect(list.length).to.be.equal(1);
    });
    describe('When add a 3 nodes (2,3,4) more',()=>{
      it('The new lenght should be 4',()=>{
        //list of new nodes to add to the list
        ["2","3","4"].forEach(value=>list.add(value));
        expect(list.length).to.be.equal(4)
      });
      it('The Head should be 1',()=>{
        expect(list.head.data).to.be.equal("1")
      });
      it ("And The Tail should be 4",()=>{
        expect(list.tail.data).to.be.equal("4")
      })
    })
  })
  
  /**
   * Testing The Remove Operation
   */
  describe('#Removing Nodes',()=>{
    describe("If I remove node 4",()=>{
      it("The new lenght should be 3, and the node return equal to '3' ",()=>{
        const node = list.remove("4");  
        expect(list.length).to.be.equal(3);
        expect(node.data).to.be.equal("4");
      })
      it("The tail's previous node would be 2",()=>{
        expect(list.tail.prev.data).to.be.equal("2")
      })
      it("And its previous node would be the head!! (1)",()=>{
        expect(list.tail.prev.prev).to.be.equal(list.head)
        expect(list.tail.prev.prev.data).to.be.equal(list.head.data)
      })
    })
  })
  /**
   * Testing The Remove Operation
   */
  describe('#Looking for Nodes',()=>{
    it("If I look for the node 1, It should return the node 1",()=>{
      expect(list.find("1").data).to.be.equal("1")
    })

    it("If I look for an unexisting node it should return undefined",()=>{
      expect(list.find("100")).to.be.undefined;
      expect(list.find(null)).to.be.undefined;
      expect(list.find(undefined)).to.be.undefined;
    })
    
  });
  /**
   * All Doubly Linked List Corner Cases
   */
  describe("#Corner Cases",()=>{
    it('If I add an either undefined or null Node there should be problem',()=>{
      expect(list.add.bind(list,undefined)).to.throw();
      expect(list.add.bind(list,null)).to.throw();
      expect(list.add.bind(list)).to.throw();
    })    
    it('If I try to remove an element from an empty list, the returned value would be undefined',()=>{
      expect(new DoublyLinkedList().remove("1")).to.be.equal(undefined);
    })
    it('If I try to remove an unexisting element, the returned value would be undefined',()=>{
      expect(list.remove("100")).to.be.undefined;
      expect(list.remove(undefined)).to.be.undefined;
      expect(list.remove(undefined)).to.be.undefined;
    })
  })
})

