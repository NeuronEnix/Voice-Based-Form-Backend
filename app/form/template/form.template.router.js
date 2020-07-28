const router = require( 'express' ).Router() ;

const validate = require( '../../../validator' ) ;
const formTemplate  = require( './form.template.controller'   ) ;

router.post( '/new' , validate.form.template.new , formTemplate.new  ) ;

module.exports.router = router
