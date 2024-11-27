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

function deepModify ( source, target ) {
    if ( typeof source !== 'object' )
        throw new Error( 'Expected an object' );
    for ( const key of Object.keys( source ) ) {
        if ( target[ key ] && typeof source[ key ] === 'object' )
            deepModify( source[ key ], target[ key ] );
        else target[ key ] = source[ key ];
    }
    return target;
}

function clone ( object ) {
	if ( !object )
		return object;
    if ( Array.isArray( object ) )
        return [ ...object ].map( e => clone( e ) );
    if ( typeof object !== "object" )
        return object;
	return Object.fromEntries(
		Object.entries( object ).map(
            ( [ key, value ] ) => [ key, clone( value ) ]
        )
	);
}

module.exports = {
    deepModify,
    clone
};
