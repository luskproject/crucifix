# Crucifix
Mozilla Specification JavaScript/ES AST Traversal and Modification Unit, as god intended.

> [!CAUTION]
> This package is deprecated, switch to [Estige](https://github.com/citrizon/estige) instead

### Installation:
Just run this command inside your project directory:
```
npm i crucifix
```

### Usage (CommonJS):
```js
// Importing the library
const crucifix = require( 'crucifix' );

// Importing our AST data from somewhere
const data = require( './ast.json' );

// Use the library
crucifix.traverse( data, {
    // We are going to list all the
    // identifiers
    Identifier ( node, manager ) {
        console.log( node.name );
    }
} );
```

### Usage (ES Module):
```js
// Importing the library
import crucifix from 'crucifix';

// Importing our AST data from somewhere
const data = await import( './ast.json', { assert: { type: 'json' } } );

// Use the library
crucifix.traverse( data, {
    // We are going to list all the
    // identifiers
    Identifier ( node, manager ) {
        console.log( node.name );
    }
} );
```

### Modification methods:
After importing the library and doing necessary things, you can modify the AST using manager methods like so:
```js
// Assuming you've imported your data
// and the crucifix library
const output = crucifix.traverse( data, {
    VariableDeclaration ( node, manager ) {
        // Clone the node
        const newNode = manager.clone();

        // After cloning the node, we can
        // safely replace the data and
        // even append new nodes to parent
        // object's own property
        manager.replace( [
            newNode,
            newNode.declarations.map( decl => (
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'print'
                        },
                        arguments: [ decl.id ]
                    }
                }
            ) )
        ] )
    }
} );

// Input data below is converted to AST
// and saved inside "ast.json" ->
//     const hey = 10;
//     const test = 20, test2 = 30;

// Output AST will be converted to code
// and the output would be:
//     const hey = 10;
//     print( hey );
//     const test = 20, test2 = 30;
//     print( test );
//     print( test2 );
```

### Other methods:
<details>
    <summary><code>manager.clone()</code></summary>
    <blockquote>Clones the node for user to do changes that does not affect the original node.</blockquote>
</details>
<details>
    <summary><code>manager.remove()</code></summary>
    <blockquote>Removes the node from the list or the property itself.</blockquote>
</details>
<details>
    <summary><code>manager.modify( source: object, surfaceLevel: boolean )</code></summary>
    <blockquote>Modifies the current property. When <code>surfaceLevel</code> is true, it copies the properties of source directly to the current property, otherwise it recursively scans through the objects to deeply modify without directly modifying the property itself.</blockquote>
</details>
<details>
    <summary><code>manager.replace( source: object|object[] )</code></summary>
    <blockquote>Replaces the current property. When an array is given, it flats out the array to append nodes to the parent object's property.</blockquote>
</details>

### Other properties:
<details>
    <summary><code>manager.item</code></summary>
    <blockquote>Returns the current node.</blockquote>
</details>
<details>
    <summary><code>manager.ancestors</code></summary>
    <blockquote>Returns the list of ancestors of the current node.</blockquote>
</details>
