const respond = require( './response' ) ;
const errData = respond.errData ;

const { user, form } = require( './validator.config' ) ;

const validator = async ( req, res, next, schema ) => {
    try { await schema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { console.log( err ) ;return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;

module.exports = {

    user : {
        signUp  : ( req, res, next ) => { validator( req, res, next, user.signUp  ) },
        signIn  : ( req, res, next ) => { validator( req, res, next, user.signIn  ) },
        signOut : ( req, res, next ) => { validator( req, res, next, user.signOut ) },
    }, 
    
    form : {
        
        template : {

            new : ( req, res, next ) => { validator( req, res, next, form.template.new ) },

        },
        
        ans : {

            new : ( req, res, next ) => { validator( req, res, next, form.ans.new ) },

        },
        
    }, 

}