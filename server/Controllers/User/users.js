
const genUsername = require( "unique-username-generator" );
const { ObjectId } = require( 'mongodb' );
const { User } = require( "../../Models/User" );
const { Plan } = require( "../../Models/Plan" );
const { Bid } = require( "../../Models/Bidhistory" );
const { Contract } = require( "../../Models/Contract" );
const { Post } = require( "../../Models/Post" );
const { Converstaion } = require( "../../Models/Converstaion" );
const { Message } = require( "../../Models/Message" );
const cloud = require( "../../Config/Cloud" );
const serviceSID = "";
const accountnSID = "";
const authToken = "";
const client = require( "twilio" )( accountnSID, authToken );
const razorpay = require( "razorpay" );
const crypto = require( "crypto" );

//user ...
const userrespond = async ( req, res, next ) =>
{
    try
    {
        res.status( 200 ).send( { message: "i am a user !" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

//user registration...
const userregister = async ( req, res, next ) =>
{
    try
    {
        const user1 = await User.findOne( { mobileNumber: req.body.mobileNumber } );
        const user = await User.findOne( { email: req.body.email } );
        if ( user )
            return res.status( 409 ).send( { message: "Email already exist!" } ).end();
        if ( user1 )
            return res.status( 409 ).send( { message: "Mobile Number already exist!" } ).end();

        const data = JSON.parse( req.body.data );
        // add three random digits
        const username = genUsername.generateFromEmail(
            data.email,
            3
        );
        const url = [];
        const files = req.files;

        for ( const file of files )
        {
            const { path } = file;
            await cloud.uploader
                .upload( path, {
                    resource_type: "auto",
                    folder: "MiddleMan",
                } ).then( ( result ) =>
                {
                    url.push( { url: result.url, id: result.public_id } );
                } );
        };

        const newuser = await new User( {
            firstName: data.firstName,
            lastName: data.lastName,
            userName: username,
            email: data.email,
            mobileNumber: data.mobileNumber,
            profilephoto: url[ 0 ],
        } ).save();
        res.status( 200 ).send( { data: newuser, message: "Successfully Registered !" } ).end();


    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

//server sending otp to user...
const otpsending = async ( req, res, next ) =>
{
    try
    {
        const mob = req.body.mob;
        console.log( mob );
        const user = await User.findOne( { $and: [ { mobileNumber: mob }, { role: 'user' } ] } );
        console.log( user );
        const Status = user ? user.status : null;
        if ( !user )
            return res.status( 409 ).send( { message: "The Mobile Number has not registered!" } ).end();
        if ( Status === "false" )
            return res.status( 409 ).send( { message: "You are Blocked By Admin!" } ).end();
        const otp = await client.verify.services( serviceSID ).verifications.create( { to: `+91${ mob }`, channel: "sms" } );
        console.log( otp );
        res.status( 200 ).send( { message: `OTP has been sent to ${ mob }` } ).end();

    } catch ( error )
    {
        console.log( error );
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
                    const user = await User.findOne( { mobileNumber: mobilenumber } );
                    const USERID = user._id;
                    const USERNAME = user.userName;
                    const USERTOKEN = user.generateAuthToken();
                    res.status( 200 ).send( { data: { USERTOKEN, USERID, USERNAME }, message: "OTP successfully verified ! " } ).end();
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

// user. data fetching from database..
const userdata = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        const USERDATA = await User.findOne( { _id: ObjectId( id ) } );
        const PLAN = await Plan.findOne( { userId: id } );
        const BIDCOUNT = await Bid.find( { biduser: id } ).count();
        const POSTHISTORY = await Post.find( { userId: id } ).count();
        const CONTRACTHISTORY = await Contract.find( { $or: [ { userId: id }, { biduserId: id } ] } ).count();
        if ( PLAN )
        {
            const PLANDATA = PLAN.premium;
            res.status( 200 ).send( { data: { PLANDATA, USERDATA, BIDCOUNT, CONTRACTHISTORY, POSTHISTORY }, message: "plan data fetched" } ).end();
        }
        else
        {
            const PLANDATA = false;
            res.status( 200 ).send( { data: { PLANDATA, USERDATA, BIDCOUNT, CONTRACTHISTORY, POSTHISTORY }, message: "plan data not available fetched" } ).end();
        }
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

// user. data fetching from database..
const userdataonly = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        const USERDATA = await User.findOne( { _id: ObjectId( id ) } );
        res.status( 200 ).send( { data: { USERDATA }, message: "plan data not available fetched" } ).end();
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

// plan data fetching from database..
const plandata = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        const PLAN = await Plan.findOne( { userId: id } );
        if ( PLAN )
        {
            const PLANDATA = PLAN.premium;
            res.status( 200 ).send( { data: { PLANDATA }, message: "plan data fetched" } ).end();
        }
        else
        {
            const PLANDATA = false;
            res.status( 200 ).send( { data: { PLANDATA }, message: "plan data not available fetched" } ).end();
        }
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

// premium plan payment...
const newplanrazorpay = async ( req, res, next ) =>
{
    try
    {
        const { userid, planrate } = req.body;
        console.log( "vannu0" );
        const razorpayMethod = () =>
        {
            const instance = new razorpay( {
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            } );
            console.log( "vannu1" );
            const options = {
                amount: planrate * 100,
                currency: "INR",
                receipt: crypto.randomBytes( 10 ).toString( "hex" ),
                payment_capture: 1,
            };
            console.log( "vannu2" );
            instance.orders.create( options, ( error, order ) =>
            {
                if ( error )
                {
                    console.log( error.message );
                    return res.status( 500 ).send( { message: "Something Went Wrong!..." } ).end();
                }

                res.status( 200 ).send( { data: order, message: " new plan started" } ).end();
            } );
        };
        razorpayMethod();
    } catch ( error )
    {

        res.status( 500 ).send( { message: "Server Error......" } ).end();

    }
};

// premium plan payment verification..
const verifyrazorpay = async ( req, res, next ) =>
{
    try
    {
        const { userid, planrate } = req.body;;
        const responsee = req.body.response;
        const paymentid = responsee.razorpay_payment_id;
        const signature = responsee.razorpay_signature;
        const orderid = responsee.razorpay_order_id;
        const sign = orderid + "|" + paymentid;
        const expectedSign = crypto.createHmac( "sha256", process.env.RAZORPAY_KEY_SECRET ).update( sign.toString() ).digest( "hex" );

        if ( signature === expectedSign )
        {
            var noofdays = 0;
            var planname = "";
            if ( planrate == 249 )
            {
                noofdays = 90;
                planname = "Three month Plan";
            }
            if ( planrate == 999 )
            {
                noofdays = 365;
                planname = "one year Plan";
            }
            if ( planrate == 449 )
            {
                noofdays = 180;
                planname = "six month Plan";
            }
            const today = new Date();
            const monthDate = new Date( new Date().setDate( today.getDate() + noofdays ) );
            const user = await User.findOne( { _id: ObjectId( userid ) } );

            const newPlan = await new Plan( {
                planName: planname,
                planrate: planrate,
                userId: userid,
                userName: user.userName,
                createdAt: today,
                expireAt: monthDate,
            } ).save();
            res.status( 200 ).send( { message: "Plan activated" } ).end();

        } else
        {
            res.status( 400 ).send( { message: "Payment Failed" } );
        }
    } catch ( error )
    {
        res.status( 500 ).send( { message: "plan activating failed....." } ).end();
    }
};

// bidhistory data of a perticular user  from database..
const bidhistorydata = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        const bidhistorydata = await Bid.find( { biduser: id } );
        res.status( 200 ).send( { data: { bidhistorydata }, message: "bid history data fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

// contract history data of a perticular user from database..
const contracthistory = async ( req, res, next ) =>
{
    try
    {
        const id = req.params.id;
        const CONTRACTHISTORY = await Contract.find( { $or: [ { userId: id }, { biduserId: id } ] } );
        res.status( 200 ).send( { data: { CONTRACTHISTORY }, message: "contract history data fetched" } ).end();

    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

//user edit Profile...
const edituserprofile = async ( req, res, next ) =>
{
    try
    {
        const id = req.body.userid;
        const data = req.body.data;
        await User.updateOne( { _id: ObjectId( id ) }, { $set: { firstName: data.firstName, lastName: data.lastName, email: data.email, mobileNumber: data.mobileNumber, } } );
        const userInfo = await User.findOne( { _id: ObjectId( id ) } );
        res.status( 200 ).send( { data: { userInfo }, message: "Successfully Edited !" } ).end();
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

//user edit Profile photo...
const edituserprofilephoto = async ( req, res, next ) =>
{
    try
    {
        const uid = req.params.id;
        const url = [];
        const files = req.files;
        for ( const file of files )
        {
            const { path } = file;
            await cloud.uploader
                .upload( path, {
                    resource_type: "auto",
                    folder: "MiddleMan",
                } ).then( ( result ) =>
                {
                    url.push( { url: result.url, id: result.public_id } );
                } );
        };
        await User.updateMany( { _id: ObjectId( uid ) }, { $set: { profilephoto: url[ 0 ] } } );
        await Post.updateMany( { userId: uid }, { $set: { profilephoto: url[ 0 ] } } );
        await Contract.updateMany( { userId: uid }, { $set: { userprofilephoto: url[ 0 ] } } );
        await Contract.updateMany( { biduserId: uid }, { $set: { contractorprofilephoto: url[ 0 ] } } );
        res.status( 200 ).send( { message: "Successfully Changed Photo !" } ).end();
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

/*  New Converstaion*/
const newConversation = async ( req, res, next ) =>
{
    try
    {
        const conversationAlready = await Converstaion.findOne( { members: { $all: [ req.body.senderId, req.body.receverId ] } } );
        if ( !conversationAlready )
        {
            await new Converstaion( {
                members: [ req.body.senderId, req.body.receverId ],
            } ).save();
            res.status( 200 ).send( { message: "New Chat created" } ).end();
        }
        else
        {
            res.status( 200 ).send( { message: "Chat Already Existed" } ).end();
        }
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    };
};

/* Conversation of perticular user*/
const fetchConversation = async ( req, res, next ) =>
{
    try
    {
        const chatContactData = await Converstaion.find( { members: { $in: [ req.params.id ] } } ).sort( { createdAt: -1 } );
        res.status( 200 ).send( { data: { chatContactData }, message: "converstation fetched!" } ).end();
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

/*  New Messages*/
const newMessages = async ( req, res, next ) =>
{
    try
    {

        const newMessage = new Message( {
            conversationId: req.body.data.conversationId,
            sender: req.body.data.sender,
            text: req.body.data.text,
        } ).save();
        res.status( 200 ).send( { data: { newMessage }, message: "New message saved!" } ).end();
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};

/* Messages of perticular user*/
const fetchMessages = async ( req, res, next ) =>
{
    try
    {
        const MESSAGES = await Message.find( { conversationId: req.params.id } );
        res.status( 200 ).send( { data: { MESSAGES }, message: "Message fetched !" } ).end();
    } catch ( error )
    {
        res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
    }
};



module.exports = {
    userrespond,
    userregister,
    otpsending,
    otpverifing,
    userdata,
    userdataonly,
    plandata,
    newplanrazorpay,
    verifyrazorpay,
    bidhistorydata,
    contracthistory,
    edituserprofile,
    edituserprofilephoto,
    newConversation,
    fetchConversation,
    newMessages,
    fetchMessages,
};
