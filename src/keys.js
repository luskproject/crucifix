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

module.exports = {
    AssignmentExpression: [ 'left', 'right' ],
    AssignmentPattern: [ 'left', 'right' ],
    ArrayExpression: [ 'elements' ],
    ArrayPattern: [ 'elements' ],
    ArrowFunctionExpression: [ 'params', 'body' ],
    AwaitExpression: [ 'argument' ],
    BlockStatement: [ 'body' ],
    BinaryExpression: [ 'left', 'right' ],
    BreakStatement: [ 'label' ],
    CallExpression: [ 'callee', 'arguments' ],
    CatchClause: [ 'param', 'body' ],
    ChainExpression: [ 'expression' ],
    ClassBody: [ 'body' ],
    ClassDeclaration: [ 'id', 'superClass', 'body' ],
    ClassExpression: [ 'id', 'superClass', 'body' ],
    ComprehensionBlock: [ 'left', 'right' ],
    ComprehensionExpression: [ 'blocks', 'filter', 'body' ],
    ConditionalExpression: [ 'test', 'consequent', 'alternate' ],
    ContinueStatement: [ 'label' ],
    DoWhileStatement: [ 'body', 'test' ],
    ExportAllDeclaration: [ 'source' ],
    ExportDefaultDeclaration: [ 'declaration' ],
    ExportNamedDeclaration: [ 'declaration', 'specifiers', 'source' ],
    ExportSpecifier: [ 'exported', 'local' ],
    ExpressionStatement: [ 'expression' ],
    ForStatement: [ 'init', 'test', 'update', 'body' ],
    ForInStatement: [ 'left', 'right', 'body' ],
    ForOfStatement: [ 'left', 'right', 'body' ],
    FunctionDeclaration: [ 'id', 'params', 'body' ],
    FunctionExpression: [ 'id', 'params', 'body' ],
    GeneratorExpression: [ 'blocks', 'filter', 'body' ],
    IfStatement: [ 'test', 'consequent', 'alternate' ],
    ImportExpression: [ 'source' ],
    ImportDeclaration: [ 'specifiers', 'source' ],
    ImportDefaultSpecifier: [ 'local' ],
    ImportNamespaceSpecifier: [ 'local' ],
    ImportSpecifier: [ 'imported', 'local' ],
    LabeledStatement: [ 'label', 'body' ],
    LogicalExpression: [ 'left', 'right' ],
    MemberExpression: [ 'object', 'property' ],
    MetaProperty: [ 'meta', 'property' ],
    MethodDefinition: [ 'key', 'value' ],
    NewExpression: [ 'callee', 'arguments' ],
    ObjectExpression: [ 'properties' ],
    ObjectPattern: [ 'properties' ],
    Program: [ 'body' ],
    Property: [ 'key', 'value' ],
    PropertyDefinition: [ 'key', 'value' ],
    RestElement: [ 'argument' ],
    ReturnStatement: [ 'argument' ],
    SequenceExpression: [ 'expressions' ],
    SpreadElement: [ 'argument' ],
    SwitchStatement: [ 'discriminant', 'cases' ],
    SwitchCase: [ 'test', 'consequent' ],
    TaggedTemplateExpression: [ 'tag', 'quasi' ],
    TemplateLiteral: [ 'quasis', 'expressions' ],
    ThrowStatement: [ 'argument' ],
    TryStatement: [ 'block', 'handler', 'finalizer' ],
    UnaryExpression: [ 'argument' ],
    UpdateExpression: [ 'argument' ],
    VariableDeclaration: [ 'declarations' ],
    VariableDeclarator: [ 'id', 'init' ],
    WhileStatement: [ 'test', 'body' ],
    WithStatement: [ 'object', 'body' ],
    YieldExpression: [ 'argument' ]
}
