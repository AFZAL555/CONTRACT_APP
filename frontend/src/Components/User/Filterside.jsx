/** @format */

import React, {useEffect, useState} from "react";
import "../chat.css";
import {format} from "timeago.js";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {styled, alpha} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search=styled("div")(({theme}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "0",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper=styled("div")(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase=styled(InputBase)(({theme}) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "82ch",
    },
  },
}));

const Filterside=() =>
{
  const [postData, setpostData]=useState([]);
  const [serach, setserach]=useState("");
  const [searchResultCount, setSearchResultCount]=useState(0);
  const [seachTrueOrFalse, setseachTrueOrFalse]=useState(false);
  const userid=localStorage.getItem("userID");
  const USERTOKEN=localStorage.getItem("userToken");

  useEffect(() =>
  {
    getAllPostData();
  }, []);
  useEffect(() =>
  {
    if(serach!=="") {
      setseachTrueOrFalse(true);
      searchpost();
    } else {
      setseachTrueOrFalse(false);
      getAllPostData();
    }
  }, [serach]);

  const getAllPostData=async () =>
  {
    try {
      //setLoading( true )
      const url="http://localhost:8080/api/users/allpost";
      const {data: res}=await axios.get(url, {
        headers: {Authorization: USERTOKEN},
      });
      const {allpostdata}=res.data;
      setpostData(allpostdata);
      //setLoading( false )
    } catch(error) {
      if(
        error.response&&
        error.response.status>=400&&
        error.response.status<=500
      ) {
        const message=error.response.data.message;
      }
    }
  };

  const searchpost=async () =>
  {
    try {
      const id=serach;
      const url="http://localhost:8080/api/users/searchpostdata/"+id;
      const {data: res}=await axios.get(url, {
        headers: {Authorization: USERTOKEN},
      });
      const {allpostdata}=res.data;
      setSearchResultCount(allpostdata.length);
      setpostData(allpostdata);
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

  const handleLikes=async (postId) =>
  {
    try {
      const url="http://localhost:8080/api/users/likes";
      const {data: res}=await axios.put(url, {userid, postId});
      getAllPostData();
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
  const handleunLikes=async (postId) =>
  {
    try {
      const url="http://localhost:8080/api/users/unlikes";
      const {data: res}=await axios.put(url, {userid, postId});
      getAllPostData();
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

  return (
    <>
      <div className="container">
        <div className="row clearfix">
          <div
            className="col-lg-12"
            style={{marginTop: "10px", width: "98%"}}
          >
            <div
              style={{
                width: "100%",
                background: "transperent ",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                className="chat"
                style={{
                  maxHeight: "86vh",
                  marginLeft: "0",
                  width: "100%",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="chat-header clearfix"
                  style={{
                    borderBottom: "2px solid #0b9b6b",
                    marginLeft: "3px",
                    height: "76px",
                  }}
                >
                  <div className="row" style={{display: "flex", justifyContent: "flex-start"}}>
                    <div className="col-lg-6">
                      <p>Post Available </p>
                      <div >
                        <Search
                          style={{
                            marginLeft: "44%",
                            border: "1px solid cornflowerblue",
                            marginTop: "-40px",
                            width: "98%",
                          }}
                        >
                          <SearchIconWrapper>
                            <SearchIcon />
                          </SearchIconWrapper>
                          <StyledInputBase
                            onChange={(e) =>
                            {
                              const value=e.target.value;
                              setserach(value);
                            }}
                            placeholder="Search Post…"
                            inputProps={{"aria-label": "search"}}
                          />
                        </Search>
                      </div>
                    </div>


                    {seachTrueOrFalse&&(<div >
                      {searchResultCount!==0? (<p style={{
                        marginLeft: " 88%",
                        marginTop: "-31px"
                      }} >
                        Seach Results({searchResultCount})
                      </p>):(<p style={{
                        marginLeft: " 88%",
                        marginTop: "-31px"
                      }} >
                        Seach Results(0)
                      </p>)}
                    </div>)}



                  </div>
                </div>
                {postData.length!==0? (
                  <div
                    className="chat-history"
                    style={{
                      marginBottom: "3px",
                      height: "86%",
                      width: "100%",
                    }}
                  >
                    <ul className="m-b-0" style={{marginLeft: "168px"}}>
                      <li className="clearfix">
                        <Box>
                          <Grid
                            container
                            spacing={0}
                            style={{marginLeft: "-182px"}}
                          >
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              lg={3}
                              style={{marginTop: "5px", width: "100%"}}
                            >
                              {postData.map((post) => (
                                <>
                                  <Card
                                    Card
                                    sx={{
                                      width: "489%",
                                      boxShadow:
                                        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    <CardHeader
                                      avatar={
                                        <Avatar
                                          alt="ProfilePic"
                                          src={post.profilephoto[0].url}
                                        />
                                      }
                                      title={post.userName}
                                      subheader={format(
                                        post.createdAt
                                      )}
                                    />
                                    <CardMedia
                                      component="img"
                                      height="fit-content"
                                      width="194"
                                      image={post.projectImage[0].url}
                                      alt="Paella dish"

                                    />
                                    <CardContent>
                                      <Typography
                                        variant="body2"
                                        style={{
                                          fontSize: "20px",
                                          color: "navy",
                                        }}
                                      >
                                        {post.projectname}
                                      </Typography>
                                    </CardContent>

                                    <CardActions disableSpacing>
                                      {post.likes!==0? (
                                        post.likeusers.filter((id) =>
                                        {
                                          return id===userid;
                                        }).length!==0? (
                                          <IconButton aria-label="like button">
                                            <ThumbUpAltIcon
                                              onClick={(e) =>
                                              {
                                                handleunLikes(post._id);
                                              }}
                                              style={{color: "red"}}
                                            />
                                          </IconButton>
                                        ):(
                                          <IconButton aria-label="like button">
                                            <ThumbUpAltOutlinedIcon
                                              onClick={(e) =>
                                              {
                                                handleLikes(post._id);
                                              }}
                                            />
                                          </IconButton>
                                        )
                                      ):(
                                        <IconButton aria-label="like button">
                                          <ThumbUpAltOutlinedIcon
                                            onClick={(e) =>
                                            {
                                              handleLikes(post._id);
                                            }}
                                          />
                                        </IconButton>
                                      )}
                                    </CardActions>

                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          marginLeft: "15px",
                                          color: "#860a95",
                                        }}
                                      >
                                        {post.likes
                                          ? post.likes
                                          :0}{" "}
                                        Likes
                                      </p>
                                      <Link
                                        to={`/viewpost/${post._id}`}
                                        style={{textDecoration: "none"}}
                                      >
                                        <Button
                                          type="submit"
                                          variant="contained"
                                          sx={{mt: 3, mb: 2, mr: 3}}
                                          style={{
                                            backgroundColor: "#dd7217 ",
                                          }}
                                          color="primary"
                                        >
                                          Details
                                        </Button>
                                      </Link>
                                    </div>
                                  </Card>
                                </>
                              ))}
                            </Grid>
                          </Grid>
                        </Box>
                      </li>
                    </ul>
                  </div>
                ):(
                  <div>
                    <div>
                      <h5 style={{marginLeft: "405px", marginTop: "2%"}}>
                        No post Available.....
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filterside;