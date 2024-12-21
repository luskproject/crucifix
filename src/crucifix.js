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
		const ancestorList = parent ? [ parent ].concat( ancestors ) : [];

		// Perform a callback if possible
		let propmanager = null;
		const call = this.callbackList[ node.type ] || this.callback;
		if ( call ) {
			if ( parentProperty ) propmanager = new CrucifixNode(
				parent,
				parentProperty,
				ancestorList,
				propertyIndex
			);
			call( node, propmanager );
		}

		// Get traversable properties and traverse
		// through them.
		const traversables = visitorKeys[ node.type ];
		if ( !traversables ) return false;
		for ( const property of traversables ) {
			// Check if the property exists in
			// that node
			if ( !node?.[ property ] )
				continue;

			// Check if the property is NOT iterable
			if ( !node[ property ]?.forEach ) {
				this.traverse( node[ property ], node, property, ancestorList );
				continue;
			}

			// Iterate through the property itself
			// and flatten it
			let shouldFilter = false;
			const prNode = node[ property ], prLength = prNode.length;
			for ( let i = 0; i < prLength; ++i ) {
				shouldFilter = this.traverse( prNode[ i ], node, property, ancestorList, i ) || shouldFilter
			}
			if ( shouldFilter )
				node[ property ] = node[ property ].flat( Infinity ).filter( e => e );
		}
		return propmanager?.shouldFilter;
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
	static traverseNoClone ( node, callbackListOrCallback = {} ) {
		( new CrucifixInternal( callbackListOrCallback ) )
			.traverse( node );
		return node;
	}
}

module.exports = Crucifix;