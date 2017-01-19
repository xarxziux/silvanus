(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.silvanus = factory();
    }
}(this, function () {
    
    return function (_compare) {
        
        if ((typeof _compare !== 'function') &&
                (typeof _compare !== 'undefined'))
            throw new Error ('No compare() function defined');
        
        const compare = (typeof _compare === 'function') ?
            _compare :
            (x, y) => (x - y);
        
        const emptyNode = {
            
            get left() {throw new Error ('Illegal call on an empty node.');},
            get right() {throw new Error ('Illegal call on an empty node.');},
            isEmpty: () => true,
            contains: () => false,
            include: function (x) {
                
                x.toString = x.toString || function () {return 'X';};
                return getNonEmptyNode (x);
                
            },
            toArray: () => [],
            toTree: () => '.'
            
        };
        
        function getNonEmptyNode (thisItem, leftItem, rightItem) {
            
            const left = (leftItem === void 0) ?
                emptyNode :
                leftItem;
                
            const right = (rightItem === void 0) ?
                emptyNode :
                rightItem;
                
            const contains = newItem => {
                
                const sortOrder = compare (thisItem, newItem);
                
                if (typeof sortOrder !== 'number')
                    throw new Error ('Illegal return value from compare()' +
                        ' function');
                
                if (sortOrder < 0)
                    return right.contains (newItem);
                        
                if (sortOrder > 0)
                    return left.contains (newItem);
                        
                if (sortOrder === 0)
                    return true;
                        
                throw new Error ('Illegal fall-through case in' +
                        ' getNonEmptyNode.compare()');
                    
            };
            
            const include = (newItem) => {
                
                const sortOrder = compare (thisItem, newItem);
                newItem.toString = newItem.toString ||
                        function () {return 'X';};
                
                if (typeof sortOrder !== 'number')
                    throw new Error ('Illegal return value from compare()' +
                            ' function');
                
                if (sortOrder < 0)
                    return getNonEmptyNode (
                            thisItem, left, right.include (newItem));
                
                if (sortOrder > 0)
                    return getNonEmptyNode (
                            thisItem, left.include (newItem), right);
                
                throw new Error ('Illegal fall-through case in' +
                        ' getNonEmptyNode.include()');
                    
            };
            
            return {
                
                left,
                right,
                isEmpty: () => false,
                contains,
                include,
                toArray: () => [].concat (left.toArray())
                        .concat (thisItem, right.toArray()),
                toTree: () => '{' + left.toTree() + ',' + thisItem.toString() +
                        ',' + right.toTree() + '}'
                
            };
        }
        
        return emptyNode;
        
    };
}));





 