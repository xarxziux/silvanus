/**
 * 
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        
        define([], factory);
        
    } else if (typeof module === 'object' && module.exports) {
        
        module.exports = factory();
        
    } else {
        
        root.bst = factory();
        
  }
}(this, function () {
    
    return function (_compare) {
        
        if ((typeof _compare !== 'function') &&
                (typeof _compare !== 'undefined'))
            throw new Error ('No compare() function defined');
        
        const compare = (typeof _compare === 'function') ?
            _compare :
            (x, y) => (x - y);
        
        const illegalCall = function() {
            
            throw new Error ('Illegal call on an empty node.');
            
        };
        
        const emptyNode = {
            
            left: illegalCall,
            right: illegalCall,
            isEmpty: () => true,
            contains: () => false,
            include: function (x) {
                
                x.toString = x.toString || function () {return 'X';};
                return getNonEmptyNode (x);
                
            },
            toArray: function() {return [];},
            toTree: function() {return '.';}
            
        };
        
        function getNonEmptyNode (thisItem, leftItem, rightItem) {
            
            if ((typeof leftItem !== 'undefined') &&
                    (typeof leftItem !== 'function'))
                console.log ('Invalid value for leftItem - ' +
                        typeof leftItem);
            
            if ((typeof rightItem !== 'undefined') &&
                    (typeof rightItem !== 'function'))
                console.log ('Invalid value for righItem - ' +
                        typeof rightItem);
            
            const left = (typeof leftItem === 'undefined') ?
                () => emptyNode :
                leftItem;
                
            const right = (typeof rightItem === 'undefined') ?
                () => emptyNode :
                rightItem;
                
            const contains = newItem => {
                
                const sortOrder = compare (thisItem, newItem);
                
                if (typeof sortOrder !== 'number')
                    throw new Error ('Illegal return value from compare()' +
                        ' function');
                
                if (sortOrder < 0)
                    return right().contains (newItem);
                        
                if (sortOrder > 0)
                    return left().contains (newItem);
                        
                if (sortOrder === 0)
                    return true;
                        
                throw new Error ('Illegal fall-through case in' +
                        ' getNonEmptyNode.compare()');
                    
            };
            
            const include = (newItem) => {
                
                const sortOrder = compare (thisItem, newItem);
                
                if (typeof sortOrder !== 'number')
                    throw new Error ('Illegal return value from compare()' +
                        ' function');
                
                if (sortOrder < 0)
                    return getNonEmptyNode (thisItem, left, 
                            () => right().include (newItem));
                
                if (sortOrder > 0)
                    return getNonEmptyNode (thisItem,
                            () => left().include (newItem), right);
                
                throw new Error ('Illegal fall-through case in' +
                        ' getNonEmptyNode.include()');
                    
            };
            
            return {
                
                left,
                right,
                isEmpty: () => false,
                contains,
                include,
                toArray: () => [].concat (left().toArray())
                        .concat (thisItem, right().toArray()),
                toTree: () => '{' + left().toTree() + ',' + thisItem.toString() +
                        ',' + right().toTree() + '}'
                
            };
        }
        
        return emptyNode;
        
    };
}));





 