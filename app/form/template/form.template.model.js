const db = require( 'mongoose' ) ;

const errData  = require( '../../../response' ).errData ;

const ObjectID = db.Schema.Types.ObjectId;

const formTemplateSchema = new db.Schema({
    UserID : {type:ObjectID, index:true, ref:"users" },
    Title  : String,
    Desc   : String,
    Data   : [{
        Que : String,
        Opt : { type:db.Schema.Types.Array },
        Typ : String,
        _id : false,
    }],
});

const FormTemplate = db.model( 'form_template', formTemplateSchema ) ;
module.exports = FormTemplate;
