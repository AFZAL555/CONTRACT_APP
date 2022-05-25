const jwt = require( 'jsonwebtoken' );

module.exports = ( req, res, next ) =>
{
    try
    {
        const token = req.header( "Authorization" );
        if ( !token )
            return res.status( 403 ).send( { message: "Access denied" } ).end();
        const decoded = jwt.verify( token, process.env.JWTPRIVATEKEY );
        req.user = decoded;
        next();
    } catch ( error )
    {
        res.status( 400 ).send( { message: "Invalid token !" } ).end();
    }
};