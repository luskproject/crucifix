/*
    Crucifix, Mozilla Specification JavaScript/ES AST Traversal
    and Modification Unit, as god intended.

    Open-Source, MIT License.

    Copyright (C) 2024 Botaro Shinomiya <nothing@citri.one>

    This project is NOT a part of Lusk. This is a seperate
    project to empower certain builtins and community-driven
    plugins. This also can be used by other programs since this
    is a standalone package. No Lusk Dependencies.

    Given copyright notes are for exclusive rights to go
    beyond the license's limits. For more information, please
    check https://github.com/luskproject/crucifix/
*/

const visitorKeys  = require( './keys' );
const CrucifixNode = require( './node' );
const { clone }    = require( './utils' );

class CrucifixInternal {
    constructor ( callbackListOrCallback = {} ) {
        switch ( typeof callbackListOrCallback ) {
            case 'function':
            case 'object':
                this.callbackList = callbackListOrCallback;
                break;
            default:
                throw new Error( 'Expected function or object in callbackListOrCallback parameter.' )
        }
    }
    traverse (
        node,
        parent = null,
        parentProperty = null,
        ancestors = [],
        propertyIndex = null,
    ) {
        // Check if the type exists and if not
        // return false
        if ( !node?.type || typeof node.type !== 'string' )
            return false;

        // Create an ancestor list
        const ancestorList = parent ? [ parent, ...ancestors ] : [];

        // Perform a callback if possible
        ( this.callbackList[ node.type ] || this.callback )?.(
            node, !parentProperty
                ? null
                : new CrucifixNode(
                    parent,
                    parentProperty,
                    ancestorList,
                    propertyIndex
                )
        );

        // Get traversable properties and traverse
        // through them.
        const traversables = visitorKeys[ node.type ];
        if ( !traversables ) return false;
        traversables.forEach( property => {
            // Check if the property exists in
            // that node
            if ( !node?.[ property ] )
                return;

            // Check if the property is NOT iterable
            if ( !node[ property ]?.forEach )
                return this.traverse( node[ property ], node, property, ancestorList );

            // Iterate through the property itself
            // and flatten it
            node[ property ].forEach(
                ( subNode, subIndex ) =>
                    this.traverse( subNode, node, property, ancestorList, subIndex )
            );
            node[ property ] = node[ property ].flat( Infinity );
        } );
    }
}

class Crucifix {
    static CrucifixInternal = CrucifixInternal;
    static traverse ( node, callbackListOrCallback = {} ) {
        const newNode = clone( node );
        ( new CrucifixInternal( callbackListOrCallback ) )
            .traverse( newNode );
        return newNode;
    }
}

module.exports = Crucifix;
