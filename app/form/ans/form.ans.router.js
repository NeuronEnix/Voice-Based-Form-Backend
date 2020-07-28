const router = require( 'express' ).Router() ;

const validate = require( '../../../validator' ) ;
const formAns  = require( './form.ans.controller'   ) ;

router.post( '/new' , validate.form.ans.new , formAns.new  ) ;

module.exports.router = router
