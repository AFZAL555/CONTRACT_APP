/** @format */

import {Avatar, Button, CardHeader, CardMedia} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./plan.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "./Loader";
import axios from "axios";
import Swal from "sweetalert2";
import {format} from "timeago.js";

const PostConfirm=() =>
{
  const navigate=useNavigate();
  const [postHistory, setpostHistory]=useState([]);
  const [Loading, setLoading]=useState(false);
  const userid=localStorage.getItem("userID");
  const USERTOKEN=localStorage.getItem("userToken");
  useEffect(() =>
  {
    getPostHistory();
  }, []);

  const getPostHistory=async () =>
  {
    try {
      setLoading(true);
      const url="http://localhost:8080/api/users/posthistoryu/"+userid;
      const {data: res}=await axios.get(url, {
        headers: {Authorization: USERTOKEN},
      });
      const {POSTHISTORY}=res.data;
      setpostHistory(POSTHISTORY);
      setLoading(false);
    } catch(error) {
      if(
        error.response&&
        error.response.status>=400&&
        error.response.status<=500
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleAgree=async (post) =>
  {
    try {
      Swal.fire({
        title: "Are you sure to Agree?",
        text: "After it will go to contract!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Successfull Contract!",
      }).then(async (result) =>
      {
        if(result.isConfirmed) {
          try {
            setLoading(true);
            const url="http://localhost:8080/api/users/bidagree";
            const {data: res}=await axios.put(
              url,
              {post},
              {headers: {Authorization: USERTOKEN}}
            );
            setLoading(false);
          } catch(error) {
            if(
              error.response&&
              error.response.status>=400&&
              error.response.status<=500
            ) {
              console.log(error.response.data.message);
            }
          }
          Swal.fire(
            "Contract Success!",
            "You made a contract in MiddleMan.",
            "success"
          );
          navigate("/contractshow");
        } else {
          Swal.fire("May be Next time !", "contract not done in MiddleMan.");
        }
      });
    } catch(error) {
      console.log(error);
    }
  };
  const handleCancel=async (post) =>
  {
    try {
      Swal.fire({
        title: "Are you sure to Cancel?",
        text: "After it will go to Budget Amount!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Successfull Cancel!",
      }).then(async (result) =>
      {
        if(result.isConfirmed) {
          try {
            setLoading(true);
            const url="http://localhost:8080/api/users/bidcancel";
            const {data: res}=await axios.put(
              url,
              {post},
              {headers: {Authorization: USERTOKEN}}
            );
            setLoading(false);
          } catch(error) {
            if(
              error.response&&
              error.response.status>=400&&
              error.response.status<=500
            ) {
              console.log(error.response.data.message);
            }
          }

          Swal.fire(
            "Bid Amount Cancelled!",
            "You made a Disagree in  Bid Amount!",
            "success"
          );
          getPostHistory();
        } else {
          Swal.fire(
            "May be Next time !",
            "Bid Amount not cancelled in MiddleMan."
          );
        }
      });
    } catch(error) {
      console.log(error);
    }
  };
  const handleDelete=async (post) =>
  {
    try {
      Swal.fire({
        title: "Are you sure to Delete Post?",
        text: "After Post will Permenantly Delete from MiddleMan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Successfull Delete!",
      }).then(async (result) =>
      {
        if(result.isConfirmed) {
          try {
            setLoading(true);
            const url="http://localhost:8080/api/users/postdelete";
            const {data: res}=await axios.delete(
              url,
              {post},
              {headers: {Authorization: USERTOKEN}}
            );
            setLoading(false);
          } catch(error) {
            if(
              error.response&&
              error.response.status>=400&&
              error.response.status<=500
            ) {
              console.log(error.response.data.message);
            }
          }
          Swal.fire(
            " Post Delete Success!",
            "Your post deleted from MiddleMan.",
            "success"
          );
          getPostHistory();
        } else {
          Swal.fire("May be Next time !", "Post not deleted from MiddleMan.");
        }
      });
    } catch(error) {
      console.log(error);
    }
  };

  if(Loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {postHistory.length!==0? (
        postHistory.map((post) => (
          <div
            className="box8"
            style={{
              height: "325px",
              width: "89%",
              marginLeft: "64px",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <div style={{display: "flex"}}>
              <div>
                <CardHeader
                  sx={{width: 212}}
                  avatar={
                    <Avatar alt="ProfilePic" src={post.profilephoto[0].url} />
                  }
                  title={post.userName}
                />
                <CardMedia
                  sx={{width: 150, marginLeft: "31px", marginTop: "13px"}}
                  component="img"
                  height="150"
                  width="150"
                  image={post.projectImage[0].url}
                  alt="Paella dish"
                />
              </div>
              <div style={{width: "51%"}}>
                <div style={{marginTop: "87px", marginLeft: "5px"}}>
                  <p style={{fontSize: "27px", fontFamily: "monospace"}}>
                    {post.projectname}
                  </p>
                  <div style={{display: "flex", marginTop: "39px"}}>
                    <p style={{fontSize: "23px", fontFamily: "monospace"}}>
                      Bid AMOUNT :
                    </p>
                    <p
                      style={{
                        fontSize: "26px",
                        fontFamily: "monospace",
                        color: "green",
                      }}
                    >
                      {post.bidAmount}
                    </p>
                  </div>
                  {post.bidAmount!==0? (
                    <div style={{display: "flex"}}>
                      <div style={{marginTop: "19px"}}>
                        <div
                          style={{textDecoration: "none", marginLeft: "81%"}}
                        >
                          <Button
                            onClick={(e) =>
                            {
                              handleAgree(post);
                            }}
                            variant="contained"
                            sx={{mb: 2, mr: 3}}
                            style={{
                              backgroundColor: "Green ",
                              width: "140px",
                              height: "47px",
                              fontSize: "20px",
                              marginLeft: "-80px",
                            }}
                          >
                            <ThumbUpAltIcon />
                            Agree
                          </Button>
                        </div>
                      </div>
                      <div style={{marginTop: "19px"}}>
                        <div
                          style={{textDecoration: "none", marginLeft: "90%"}}
                        >
                          <Button
                            onClick={(e) =>
                            {
                              handleCancel(post);
                            }}
                            variant="contained"
                            sx={{mb: 2, mr: 3}}
                            style={{
                              backgroundColor: "#a00deb ",
                              width: "140px",
                              height: "47px",
                              fontSize: "20px",
                              marginLeft: "-44px",
                            }}
                          >
                            <CancelIcon />
                            Cancel
                          </Button>
                        </div>
                      </div>
                      <div style={{marginTop: "19px"}}>
                        <div
                          style={{textDecoration: "none", marginLeft: "90%"}}
                        >
                          <Button
                            onClick={(e) =>
                            {
                              handleDelete(post);
                            }}
                            variant="contained"
                            sx={{mb: 2, mr: 3}}
                            style={{
                              backgroundColor: "red ",
                              width: "140px",
                              height: "47px",
                              fontSize: "20px",
                              marginLeft: "-25px",
                            }}
                          >
                            <DeleteIcon />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ):(
                    <div style={{display: "flex"}}>
                      <div style={{marginTop: "19px"}}>
                        <div
                          style={{textDecoration: "none", marginLeft: "90%"}}
                        >
                          <Button
                            onClick={(e) =>
                            {
                              handleDelete(post);
                            }}
                            variant="contained"
                            sx={{mb: 2, mr: 3}}
                            style={{
                              backgroundColor: "red ",
                              width: "140px",
                              height: "47px",
                              fontSize: "20px",
                              marginLeft: "-80px",
                            }}
                          >
                            <DeleteIcon />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{width: " -webkit - fill - available"}}>
                {post.confirmed===true? (
                  <p
                    style={{
                      textDecoration: "none",
                      marginTop: "11px",
                      marginLeft: "76% ",
                    }}
                  >
                    <Button
                      sx={{mt: 3, mb: 2, mr: 3}}
                      style={{backgroundColor: "white "}}
                      color="primary"
                    ></Button>
                  </p>
                ):(
                  <Link
                    to={`/viewpost/${post._id}`}
                    style={{
                      textDecoration: "none",
                      marginTop: "11px",
                      marginLeft: "77% ",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{mt: 3, mb: 2, mr: 3}}
                      style={{backgroundColor: "#dd7217 "}}
                      color="primary"
                    >
                      Details
                    </Button>
                  </Link>
                )}

                {post.confirmed===true? (
                  <Button
                    variant="contained"
                    disabled
                    sx={{mb: 2, mr: 3}}
                    style={{
                      alignItems: "inherit",
                      backgroundColor: "white ",
                      width: "184px",
                      height: "47px",
                      fontSize: "15px",
                      marginTop: "10%",
                      marginLeft: "350px",
                    }}
                  >
                    <p style={{color: "green"}}>Contract Confirmed</p>
                  </Button>
                ):(
                  <Button
                    variant="contained"
                    disabled
                    sx={{mb: 2, mr: 3}}
                    style={{
                      alignItems: "inherit",
                      backgroundColor: "white ",
                      width: "184px",
                      height: "47px",
                      fontSize: "15px",
                      marginTop: "10%",
                      marginLeft: "350px",
                    }}
                  >
                    <p style={{color: "red"}}>Contract Pending</p>
                  </Button>
                )}
                <div className="date" style={{display: "flex"}}>
                  <p style={{color: "black"}}>Posted:</p>
                  <p style={{color: "green"}}>
                    {format(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ):(
        <h3 className="history">No Post History Available....!</h3>
      )}
    </div>
  );
};

export default PostConfirm;

