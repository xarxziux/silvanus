'use strict';

const expect = require("chai").expect;
const should = require('chai').should();
const silvanus = require ('../src/0_base/silvanus.js');

describe('Binary tree tests', function() {
    
      const emptyTree = silvanus();
      
      it ('Should return a basic empty tree', function() {
          
          expect (emptyTree.isEmpty()).to.equal (true);
          expect (emptyTree.contains()).to.equal (false);
          expect (emptyTree.toTree()).to.equal ('.');
          // expect (emptyTree.left).to.throw (Error);
          // expect (emptyTree.left).to.throw ('Illegal call on an empty node.');
          
    });
    
    it ('Should return a number tree', function() {
        
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
              '{{.,1,.},4,{.,15,{{.,17,.},27,{' +
              '{.,43,{.,54,.}},86,{.,90,.}}}}}');
        expect (numTree.contains (5)).to.equal (false);
        expect (numTree.contains (43)).to.equal (true);
        expect (numArray.length).to.equal (9);
        expect (numArrayTotal).to.equal (337);
        
    });
    
    it ('Should return a string tree', function() {
        
        const compareStr = (x, y) => {
            
            if ((typeof x !== 'string') ||
                    (typeof x !== 'string'))
                throw new Error (
                        'Invalid parameters to compareStr() function.');
            
            if (x === y) return 0;
            if (x < y) return -1;
            if (x > y) return 1;
            throw new Error (
                    'Illegal fall-through case in compareStr() function');
            
        };
        
        let strTree = silvanus (compareStr);
        strTree = strTree.include ('a');
        strTree = strTree.include ('eg');
        strTree = strTree.include ('gtxd');
        strTree = strTree.include ('h');
        strTree = strTree.include ('ttfr');
        strTree = strTree.include ('e4r');
        strTree = strTree.include ('vvgba');
        strTree = strTree.include ('u');
        strTree = strTree.include ('1q');
        strTree = strTree.include ('jny');
        strTree = strTree.include ('Fe');
        strTree = strTree.include ('7u8');
        strTree = strTree.include ('j26');
        strTree = strTree.include ('_6y');
        
        const strArray = strTree.toArray();
        const strArrayTotal = strArray.reduce (
            (accum, nextItem) => (accum + nextItem));
        
        expect (strTree.toTree()).to.equal ('{{.,1q,{{.,7u8,.},Fe,{.,_6y,.}}}' +
                ',a,{{.,e4r,.},eg,{.,gtxd,{.,h,{{{.,j26,.},jny,.},ttfr,{{.,u' +
                ',.},vvgba,.}}}}}}');
        expect (strTree.contains ('rfrd')).to.equal (false);
        expect (strTree.contains ('ttfr')).to.equal (true);
        expect (strArray.length).to.equal (14);
        expect (strArrayTotal).to.equal (
                '1q7u8Fe_6yae4reggtxdhj26jnyttfruvvgba');
        
    });
});


































