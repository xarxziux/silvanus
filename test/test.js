'use strict';

const expect = require("chai").expect;
const should = require('chai').should();
const silvanus = require ('../src/0_base/silvanus.js');

describe('Binary tree tests', function() {
    
    describe ('Empty node', function() {
      
      const emptyTree = silvanus();
      
      it ('should return a basic empty tree', function() {
          
          expect (emptyTree.isEmpty()).to.equal (true);
          expect (emptyTree.contains()).to.equal (false);
          expect (emptyTree.toTree()).to.equal ('.');
          // expect (emptyTree.left).to.throw (Error);
          // expect (emptyTree.left).to.throw ('Illegal call on an empty node.');
          
      });
    });
    
    describe ('Small number node', function() {
        
        let numTree = silvanus();
        numTree = numTree.include (4);
        numTree = numTree.include (15);
        numTree = numTree.include (1);
        numTree = numTree.include (27);
        numTree = numTree.include (86);
        numTree = numTree.include (43);
        numTree = numTree.include (90);
        numTree = numTree.include (17);
        numTree = numTree.include (54);
        
        const numArray = numTree.toArray();
        const numArrayTotal = numArray.reduce (
            (accum, nextItem) => (accum + nextItem));

        expect (numTree.toTree()).to.equal (
              '{{.,1,.},4,{.,15,{{.,17,.},27,{{.,43,{.,54,.}},86,{.,90,.}}}}}');
        expect (numTree.contains (5)).to.equal (false);
        expect (numTree.contains (43)).to.equal (true);
        expect (numArray.length).to.equal (9);
        expect (numArrayTotal).to.equal (337);
        
    });
});












