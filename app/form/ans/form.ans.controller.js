const FormAns = require( './form.ans.model'  ) ;
const respond = require( '../../../response' ) ;
const { object } = require('@hapi/joi');

module.exports.new = async ( req, res ) => {

    const formAns = new FormAns() ;
    Object.assign( formAns, req.body ) ;
    formAns.UserID = req.UserID ;
    await formAns.save() ;
    return respond.ok( res, {FormAnsID:formAns._id} ) ;

} ;
