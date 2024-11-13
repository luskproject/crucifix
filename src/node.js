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

const privateSym = Symbol();
const { deepModify, clone } = require( './utils' );

module.exports = class CrucifixNode {
    constructor ( parent, key, ancestors, index = null ) {
        this.parent = parent;
        this.key = key;
        this.index = index;
        this.__ancestors = ancestors;
    }

    [ privateSym ] () {
        if ( typeof this.index !== undefined )
            return { $: this.parent[ this.key ][ this.index ] };
        return { $: this.parent[ this.key ] };
    }

    get item () {
        return this[ privateSym ]().$;
    }

    get ancestors () {
        return this.__ancestors;
    }

    remove () {
        if ( this.index )
            delete this.parent[ this.key ][ this.index ];
        delete this.parent[ this.key ];
    }

    modify ( obj, surfaceLevel = false ) {
        const ref = this[ privateSym ]();
        if ( surfaceLevel )
            for ( const [ key, value ] of Object.entries( obj ) )
                ref.$[ key ] = value;
        else deepModify( obj, ref.$ );
    }

    replace ( obj ) {
        if ( obj instanceof Array ) {
            if ( typeof this.index === 'undefined' )
                throw new Error( 'This object cannot be turned into an array since the parent property is not an array' );
            return this.parent[ this.key ][ this.index ] = obj;
        }
        return this.parent[ this.key ] = obj;
    }

    clone () {
        return clone( this.item );
    }
}