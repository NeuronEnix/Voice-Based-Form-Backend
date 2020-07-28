const db = require( 'mongoose' ) ;

const errData  = require( '../../../response' ).errData ;
const ObjectID = db.Schema.Types.ObjectId;

const formAnsSchema = new db.Schema({
    UserID         : { type: ObjectID, index:true, ref:"users" },
    FormTemplateID : { type: ObjectID, index:true, ref:"users" },
    Data           : [ String ],
});

const FormAns = db.model( 'form_ans', formAnsSchema ) ;
module.exports = FormAns;
