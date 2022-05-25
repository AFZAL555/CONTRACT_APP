
/** @format */

const genUsername=require("unique-username-generator");
const {User}=require("../../Models/User");
const {Post}=require("../../Models/Post");
const cloud=require("../../Config/Cloud");
const {ObjectId}=require("mongodb");
const {Bid}=require("../../Models/Bidhistory");
const {Contract}=require("../../Models/Contract");

//Adding New Post...
const AddNewPost=async (req, res, next) =>
{
  try {
    const data=JSON.parse(req.body.data);
    const userId=req.params.id;
    const user=await User.findById({_id: ObjectId(userId)});
    const profilePhoto=user.profilephoto[0];
    const username=user.userName;
    const url=[];
    const files=req.files;

    for(const file of files) {
      const {path}=file;
      await cloud.uploader
        .upload(path, {
          resource_type: "auto",
          folder: "MiddleMan",
        })
        .then((result) =>
        {
          url.push({url: result.url, id: result.public_id});
        });
    }

    const newPost=await new Post({
      projectname: data.projectname,
      userId: userId,
      userName: username,
      mobileNumber: data.mobilenumber,
      budget: data.budget,
      description1: data.description1,
      description2: data.description2,
      description3: data.description3,
      description4: data.description4,
      description5: data.description5,
      projectImage: url[0],
      profilephoto: profilePhoto,
    });
    newPost.save();
    res.status(200).send({message: "New Post Added In MiddleMan"}).end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Data of Trending post..
const TrendingPost=async (req, res, next) =>
{
  try {
    const trendingpost=await Post.find({}).sort({likes: -1}).limit(4);
    res.status(200).send({data: {trendingpost}, message: "Trending post In MiddleMan"}).end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Data of random post..
const RandomPost=async (req, res, next) =>
{
  try {
    const randompostdata=await Post.aggregate([{$sample: {size: 4}}]);
    res
      .status(200)
      .send({data: {randompostdata}, message: "Random post In MiddleMan"})
      .end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Data of one post..
const OnePostData=async (req, res, next) =>
{
  try {
    const id=req.params.id;
    const onepost=await Post.findById({_id: ObjectId(id)});
    res
      .status(200)
      .send({data: {onepost}, message: "one  post In MiddleMan"})
      .end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Data of Trending post..
const Allpostdata=async (req, res, next) =>
{
  try {
    const allpostdata=await Post.find({});
    res
      .status(200)
      .send({data: {allpostdata}, message: "All post In MiddleMan"})
      .end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Data of Trending post..
const Newbid=async (req, res, next) =>
{
  try {
    const {bidAmount, userid, id}=req.body;
    await Post.updateOne(
      {_id: ObjectId(id)},
      {$set: {bidAmount: bidAmount, biduser: userid}}
    );
    const SpecificPostData=await Post.findOne({_id: ObjectId(id)});
    const newBidHisory=await new Bid({
      projectname: SpecificPostData.projectname,
      postId: id,
      userId: SpecificPostData.userId,
      userName: SpecificPostData.userName,
      mobileNumber: SpecificPostData.mobileNumber,
      budget: SpecificPostData.budget,
      bidAmount: SpecificPostData.bidAmount,
      biduser: SpecificPostData.biduser,
      projectImage: SpecificPostData.projectImage,
      profilephoto: SpecificPostData.profilephoto,
    }).save();
    res.status(200).send({message: "Bid Successfully Placed"}).end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Data of all post of perticular user..
const posthistoryu=async (req, res, next) =>
{
  try {
    const id=req.params.id;
    const POSTHISTORY=await Post.find({userId: id});
    res
      .status(200)
      .send({data: {POSTHISTORY}, message: "one  post In MiddleMan"})
      .end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Bid Agree of a post..
const bidagree=async (req, res, next) =>
{
  try {
    const {post}=req.body;
    const conid=post.biduser;
    const contractor=await User.findOne({_id: ObjectId(conid)});
    await Contract({
      projectname: post.projectname,
      description1: post.description1,
      description2: post.description2,
      description3: post.description3,
      description4: post.description4,
      description5: post.description5,
      userId: post.userId,
      biduserId: post.biduser,
      userName: post.userName,
      contractoruserName: contractor.userName,
      usermobileNumber: post.mobileNumber,
      contractormobileNumber: contractor.mobileNumber,
      budget: post.budget,
      bidAmount: post.bidAmount,
      projectImage: post.projectImage,
      userprofilephoto: post.profilephoto,
      contractorprofilephoto: contractor.profilephoto,
      postcreatedAt: post.createdAt,
    }).save();
    const id=post._id;
    await Bid.updateOne(
      {
        $and: [
          {postId: id},
          {bidAmount: post.bidAmount},
          {biduser: post.biduser},
        ],
      },
      {$set: {confirmed: true}}
    );
    const postdelete=await Post.findById(id);
    await postdelete.remove();
    res
      .status(200)
      .send({message: "Contract Agree for a  post In MiddleMan"})
      .end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Bid Amount cancelled by user..
const CancelBid=async (req, res, next) =>
{
  try {
    const {post}=req.body;
    const id=post._id;
    await Post.updateOne(
      {_id: ObjectId(id)},
      {$set: {bidAmount: 0, biduser: ""}}
    );
    res
      .status(200)
      .send({message: "post bid amount cancelled In MiddleMan"})
      .end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//delete Post...
const deletePost=async (req, res, next) =>
{
  try {
    const {post}=req.body;
    const id=post._id;
    const postdelete=await Post.findById(id);
    await cloud.uploader.destroy(postdelete.projectImage[0].id);
    await postdelete.remove();
    res.status(200).send({message: "Post Deleted"}).end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//Data of search post..
const searchpostdata=async (req, res, next) =>
{
  try {
    const id=req.params.id.trim();
    const allpostdata=await Post.find({
      $or: [{projectname: {$regex: id, $options: "i"}}, {userName: {$regex: id, $options: "i"}}],
    });
    res
      .status(200)
      .send({data: {allpostdata}, message: "searched post In MiddleMan"})
      .end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//likes Post...
const likes=async (req, res, next) =>
{
  try {
    const {userid, postId}=req.body;
    const postd=await Post.findOne(
      {_id: ObjectId(postId)});
    const newlike=postd.likes+1;
    const userlike=await Post.updateOne(
      {_id: ObjectId(postId)},
      {$push: {likeusers: userid}, $set: {likes: newlike}}
    );
    res.status(200).send({message: "Post liked"}).end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

//unlikes Post...
const unlikes=async (req, res, next) =>
{
  try {
    const {userid, postId}=req.body;
    const postd=await Post.findOne(
      {_id: ObjectId(postId)});
    const newlike=postd.likes-1;
    const userlike=await Post.updateOne(
      {_id: ObjectId(postId)},
      {$pull: {likeusers: userid}, $set: {likes: newlike}}
    );
    res.status(200).send({message: "Post unliked"}).end();
  } catch(error) {
    res.status(500).send({message: "Some Error Occured !"}).end();
  }
};

module.exports={
  AddNewPost,
  TrendingPost,
  RandomPost,
  OnePostData,
  Allpostdata,
  Newbid,
  posthistoryu,
  bidagree,
  CancelBid,
  deletePost,
  searchpostdata,
  likes,
  unlikes,
};