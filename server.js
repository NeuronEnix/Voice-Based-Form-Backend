require( 'dotenv' ).config() ; // Configures env vars ;
const cors         = require( 'cors' ) ;
const express      = require( 'express' ) ;
const cookieParser = require( 'cookie-parser' ) ;
                     require( 'express-async-errors' ) ;

const mainApp = require( './app' ) ;
const respond = require( './response' ) ;
const auth    = require( './middleware/auth' ) ;

const db = require( './connection' ) ;
db.connect() ;

const app = express() ;

const corsOptions = {
    origin: [ 'http://localhost:3000' ],
    credentials: true,
}

app.use( cookieParser(), cors( corsOptions ), express.json(), auth.authorize, mainApp.router ) ;
app.use( respond.errHandler ) ;

const PORT = process.env.SERVER_PORT ;
app.listen( PORT, () => { console.log( 'Listening on port ' + PORT ) } ) ;