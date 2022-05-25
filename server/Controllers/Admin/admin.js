const { User } = require( "../../Models/User" );
const { ObjectId } = require( 'mongodb' );
const { Post } = require( "../../Models/Post" );
const { Plan } = require( "../../Models/Plan" );
const { Bid } = require( "../../Models/Bidhistory" );
const { Contract } = require( "../../Models/Contract" );
const serviceSID = "";
const accountnSID = "";
const authToken = "";
const client = require( "twilio" )( accountnSID, authToken );
const cloud = require( "../../Config/Cloud" );
const upload = require( "../../Config/multer" );

const adminrespond = ( req, res, next ) =>
{
    res.send( 'I am Admin....!' );
};

//server sending otp to user...
const otpsending = async ( req, res, next ) =>
{
    try
    {
        const mob = req.body.mob;
        const Admin = await User.findOne( { mobileNumber: mob } );
        const role = Admin.role;
        if ( !Admin )
            return res.status( 409 ).send( { message: "Enter Registered Mobile Number!" } ).end();
        if ( role != "admin" )
            return res.status( 409 ).send( { message: "No Entry Authorised Persons Only" } );
        await client.verify.services( serviceSID ).verifications.create( { to: `+91${ mob }`, channel: "sms" } )
            .then( ( otp ) =>
            {
                res.status( 200 ).send( { message: `OTP has been sent to ${ mob }` } ).end();
            } );
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//server verifing otp from user...
const otpverifing = async ( req, res, next ) =>
{
    try
    {
        const otp = req.body.otp;
        const mobilenumber = req.body.mobilenum;
        await client.verify.services( serviceSID ).verificationChecks.create( { to: `+91${ mobilenumber }`, code: otp } )
            .then( async ( check ) =>
            {
                if ( check.valid === true )
                {
                    const Admin = await User.findOne( { mobileNumber: mobilenumber } );
                    const ADMINID = Admin._id;
                    const ADMINTOKEN = Admin.generateAuthToken();
                    res.status( 200 ).send( { data: { ADMINTOKEN, ADMINID }, message: "OTP successfully verified ! " } ).end();
                } else
                {
                    res.status( 409 ).send( { message: "Invalid OTP! " } ).end();
                }
            } );
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch user Data...
const userdata = async ( req, res, next ) =>
{
    try
    {
        const USERDATAS = await User.find( { role: "user" } );
        res.status( 200 ).send( { data: { USERDATAS }, message: "User Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch post Data...
const postdata = async ( req, res, next ) =>
{
    try
    {
        const POSTDATA = await Post.find( {} );
        res.status( 200 ).send( { data: { POSTDATA }, message: "Post Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//block user...
const block = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        const block = await User.updateOne( { _id: ObjectId( id ) }, { $set: { status: false } } );
        res.status( 200 ).send( { message: "User Blocked" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//unblock user...
const unblock = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        await User.updateOne( { _id: ObjectId( id ) }, { $set: { status: true } } );
        res.status( 200 ).send( { message: "User Unblocked" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//delete Post...
const deletePost = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        const post = await Post.findById( id );
        await cloud.uploader.destroy( post.projectImage[ 0 ].id );
        await post.remove();
        res.status( 200 ).send( { message: "Post Deleted" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};


//fetch transaction Data...
const transactionsdata = async ( req, res, next ) =>
{
    try
    {
        const TRANSACTIONDATA = await Plan.find( {} );
        res.status( 200 ).send( { data: { TRANSACTIONDATA }, message: "Transaction Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch contract Data...
const contractsdata = async ( req, res, next ) =>
{
    try
    {
        const CONTRACTDATA = await Contract.find( {} );
        res.status( 200 ).send( { data: { CONTRACTDATA }, message: "Contract Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch contract Data...
const userstatics = async ( req, res, next ) =>
{
    try
    {
        const date = new Date();
        const lastYear = new Date( date.setFullYear( date.getFullYear() - 1 ) );
        const userstaticss = await User.aggregate( [
            {
                $match: {
                    createdAt: {
                        $gte: lastYear,
                    },
                },
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt",
                    },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ] );

        let totalIncome = 0;
        const totalplan = await Plan.find( {}, { planrate: 1, _id: 0 } );
        totalplan.forEach( rate =>
        {
            totalIncome = rate.planrate + totalIncome;
        } );
        const postcounts = await Post.count();
        const bidcounts = await Bid.count();
        const contractcounts = await Contract.count();
        res.status( 200 ).send( { data: { userstaticss, totalIncome, postcounts, bidcounts, contractcounts }, message: "active user ststics Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch latest transaction Data...
const latesttransactions = async ( req, res, next ) =>
{
    try
    {
        const TRANSACTIONDATA = await Plan.find( {} ).sort( { createdAt: -1 } ).limit( 5 );
        res.status( 200 ).send( { data: { TRANSACTIONDATA }, message: "Transaction Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch fetchsalesreport Data...
const fetchsalesreport = async ( req, res, next ) =>
{
    try
    {
        const report = await Plan.find( {} );
        res.status( 200 ).send( { data: { report }, message: "report Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch fetchfilterReport Data...
const fetchfilterReport = async ( req, res, next ) =>
{
    try
    {
        const { fromDate, toDate } = req.body;
        const report = await Plan.aggregate( [ { $match: { createdAt: { $gte: new Date( fromDate ), $lte: new Date( toDate ) }, }, }, ] );
        res.status( 200 ).send( { data: { report }, message: "report Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch fetchdayReport Data...
const fetchdayReport = async ( req, res, next ) =>
{
    try
    {
        let today = new Date();
        today = new Date( today.setHours( 0, 0, 0, 0 ) ).toISOString();
        const report = await Plan.aggregate( [
            {
                $match:
                {
                    createdAt: { $gte: new Date( today ) }
                }
            },
        ] );
        res.status( 200 ).send( { data: { report }, message: "report Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch fetchweekReport Data...
const fetchweekReport = async ( req, res, next ) =>
{
    try
    {
        let day = new Date().getDay();
        if ( day == 0 )
        {
            day = 7;
        } else if ( day == 1 )
        {
            day = 2;
        }

        let nowDate = new Date( Date.now() - day * 24 * 60 * 60 * 1000 );
        let date = new Date( nowDate.setHours( 0, 0, 0, 0 ) ).toISOString();
        const report = await Plan.aggregate( [
            {
                $match:
                {

                    createdAt: { $gte: new Date( date ) }
                }
            },
        ] );
        res.status( 200 ).send( { data: { report }, message: "report Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch fetchmonthReport Data...
const fetchmonthReport = async ( req, res, next ) =>
{
    try
    {
        let month = new Date();
        let firstMonth = new Date( month.getFullYear(), month.getMonth(), 1 );
        let date = new Date( firstMonth.setHours( 0, 0, 0, 0 ) ).toISOString();

        const report = await Plan.aggregate( [
            {
                $match:
                {

                    createdAt: { $gte: new Date( date ) }
                }
            },
        ] );


        res.status( 200 ).send( { data: { report }, message: "report Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

//fetch fetchyearlyReport Data...
const fetchyearlyReport = async ( req, res, next ) =>
{
    try
    {
        let currentYear = new Date().getFullYear();
        currentYear = currentYear + "-" + "01-01";
        currentYear = new Date( currentYear );
        const date = new Date( currentYear ).toISOString;
        const report = await Plan.aggregate( [
            {
                $match:
                {
                    createdAt: { $gte: new Date( date ) }
                }
            },
        ] );
        res.status( 200 ).send( { data: { report }, message: "report Data Fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }

};

module.exports = {
    adminrespond,
    otpsending,
    otpverifing,
    userdata,
    postdata,
    block,
    unblock,
    deletePost,
    transactionsdata,
    contractsdata,
    userstatics,
    latesttransactions,
    fetchsalesreport,
    fetchfilterReport,
    fetchdayReport,
    fetchweekReport,
    fetchmonthReport,
    fetchyearlyReport,



};