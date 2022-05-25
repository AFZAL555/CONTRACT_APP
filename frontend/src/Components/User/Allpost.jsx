/** @format */

import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import {format} from "timeago.js";
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
import axios from "axios";
import Loader from "./Loader";

const Allpost=() =>
{
  const [randomposts, setrandomposts]=useState([]);
  const userid=localStorage.getItem("userID");
  const [Loading, setLoading]=useState(false);
  useEffect(() =>
  {
    getRandomposts();
  }, []);

  const USERTOKEN=localStorage.getItem("userToken");
  const getRandomposts=async () =>
  {
    try {
      const url="http://localhost:8080/api/users/randompost";
      const {data: res}=await axios.get(url, {
        headers: {Authorization: USERTOKEN},
      });
      const {randompostdata}=res.data;
      setrandomposts(randompostdata);
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
  const handleLikes=async (postId) =>
  {
    try {
      const url="http://localhost:8080/api/users/likes";
      const {data: res}=await axios.put(url, {userid, postId});
      getRandomposts();
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
      getRandomposts();
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

  if(Loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Box>
        <Grid container spacing={0} style={{marginLeft: "2px"}}>
          {randomposts&&
            randomposts.map((post) => (
              <Grid item xs={12} sm={4} lg={3} style={{marginTop: "5px"}}>
                <>
                  <Card
                    Card
                    sx={{
                      width: 300,
                      boxShadow:
                        "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
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
                      subheader={format(post.createdAt)}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      width="194"
                      image={post.projectImage[0].url}
                      alt="project_sample_Image"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{fontSize: "20px", color: "black"}}
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
                      <p style={{marginLeft: "15px", color: "#860a95"}}>
                        {post.likes? post.likes:0} Likes
                      </p>
                      <Link
                        to={`/viewpost/${post._id}`}
                        style={{textDecoration: "none"}}
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
                    </div>
                  </Card>
                </>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default Allpost;
