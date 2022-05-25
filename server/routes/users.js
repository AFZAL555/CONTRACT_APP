/** @format */
const express=require("express");
const router=express.Router();
const userControllers=require("../Controllers/User/users");
const PostControllers=require("../Controllers/User/post");
const upload=require("../Config/multer");
const auth=require("../MiddleWare/auth");

/* GET page. */
router.get("/", userControllers.userrespond);

/* POST userregistration. */
router.post("/registernewuser", upload.array("img"), userControllers.userregister);

/* POST OTP Sending. */
router.post("/otpsending", userControllers.otpsending);

/* POST OTP verifing. */
router.post("/otpverifing", userControllers.otpverifing);

/* GET user data. */
router.get("/userdata/:id", auth, userControllers.userdata);

/* GET user data. */
router.get("/userdataonly/:id", userControllers.userdataonly);

/* POST Add new post data. */
router.post("/addnewpost/:id", auth, upload.array("img"), PostControllers.AddNewPost);

/* GET Trending post data. */
router.get("/trendingpost", auth, PostControllers.TrendingPost);

/* GET random post data. */
router.get("/randompost", auth, PostControllers.RandomPost);

/* GET one post data. */
router.get("/onepost/:id", auth, PostControllers.OnePostData);

/* GET All Post Data. */
router.get("/allpost", auth, PostControllers.Allpostdata);

/* POST plan payment */
router.post("/newplanrazorpay", userControllers.newplanrazorpay);

/* POST plan payment verification*/
router.post("/verifyrazorpay", userControllers.verifyrazorpay);

/* GET user data. */
router.get('/plandata/:id', auth, userControllers.plandata);

/* PUT Bid on post. */
router.put("/newbid", auth, PostControllers.Newbid);

/*GET bidhistory of a perticular user */
router.get("/bidhistory/:id", userControllers.bidhistorydata);

/*GET posthistory of a perticular user */
router.get("/posthistoryu/:id", PostControllers.posthistoryu);

/*PUT Bid Agree of a perticular post */
router.put("/bidagree", PostControllers.bidagree);

/*PUT Bid cancel of a perticular post */
router.put("/bidcancel", PostControllers.CancelBid);

/*POST deletion  of a perticular post */
router.delete("/postdelete", PostControllers.deletePost);

/*GET contract history of a perticular user */
router.get("/contracthistory/:id", userControllers.contracthistory);

/*GET search post data  of a perticular post */
router.get("/searchpostdata/:id", PostControllers.searchpostdata);

/*PUT likes  of a perticular post */
router.put("/likes", PostControllers.likes);

/*PUT unlikes  of a perticular post */
router.put("/unlikes", PostControllers.unlikes);

/*PUT edit user profile  of a perticular post */
router.put("/edituserprofile", userControllers.edituserprofile);

/*PUT edit user profile  of a perticular post */
router.put("/edituserprofilepic/:id", upload.array("img"), userControllers.edituserprofilephoto);

/* POST New Converstaion*/
router.post("/newconversation", auth, userControllers.newConversation);

/* GET  Conversation of perticular user*/
router.get("/fetchconversation/:id", userControllers.fetchConversation);

/* POST New Messages*/
router.post("/newmessages", auth, userControllers.newMessages);

/* GET  Messages of perticular user*/
router.get("/fetchMessages/:id", userControllers.fetchMessages);


module.exports=router;