const router = require( 'express' ).Router() ;

const ans      = require( './ans/form.ans.router' ) ;
router.use( '/ans', ans.router ) ;

const template = require( './template/form.template.router' ) ;
router.use( '/template', template.router ) ;


module.exports.router = router
