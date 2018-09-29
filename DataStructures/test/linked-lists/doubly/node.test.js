import Node from '@/linked-lists/doubly/node.js';
import {expect} from "chai";

describe('When I make a instance of Node (new Node("1") for DoublyLinkedList)', () => {
  const node= new Node("1");
  it('It Should be an instance of  Node (for DoublyLinkedList)', () => {
    expect(node).to.be.an.instanceOf(Node);
  });

  it('Its data should be 1', () => {
    expect(node.data).to.be.equal("1")
  });

  it('Its previous and next pointer should be undefined, only undefined', () => {
    expect(node.data.next).to.be.undefined;
    expect(node.data.prev).to.be.undefined;
  });
})