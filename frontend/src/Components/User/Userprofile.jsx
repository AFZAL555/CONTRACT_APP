import React, {useEffect, useRef, useState} from 'react';
import './profil.css';
import {Link, useNavigate} from 'react-router-dom';
import {Box, TextField} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import axios from 'axios';
import Loader from './Loader';
import Navbar from './Navbar';
import {useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Userprofile=() =>
{
  const navigate=useNavigate();
  const [imgOne, setimgOne]=useState({});
  const inputImageOne=useRef();
  const [userdata, setuserdata]=useState();
  const [edit, setedit]=useState(false);
  const [profilephoto, setprofilephoto]=useState();
  const [premium, setpremium]=useState(false);
  const [bidCount, setbidCount]=useState(0);
  const [postCount, setpostCount]=useState(0);
  const [contractCount, setcontractCount]=useState(0);
  const [mobilenum, setmobilenum]=useState('');
  const userid=localStorage.getItem("userID");
  const USERTOKEN=localStorage.getItem("userToken");
  const [Loading, setLoading]=useState(false);
  const [trigger, settrigger]=useState(false);
  const {register, handleSubmit, formState: {errors}}=useForm({mode: "onChange"});


  //notification 
  const notificationSuccess=(m) => {toast.success(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};
  const notificationWarning=(m) => {toast.warn(''+m, {theme: "dark", position: "top-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });};



  useEffect(() =>
  {

    if(!USERTOKEN) {
      navigate("/");
    }
    else {
      getuserdata();
    }
  }, []);

  useEffect(() =>
  {
    profileChange();
  }, [imgOne]);


  const inputImageTrigger=(target) =>
  {
    Swal.fire({
      title: 'Are you sure for change Profile Photo?',
      text: "After there will be change in profile Photo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Edit it!'
    }).then((result) =>
    {
      if(result.isConfirmed) {
        target.current.click();
      }
    });
  };


  const selectimgOne=(e) =>
  {
    if(e.target.files.length>0) {
      const file=e.target.files[0];
      const url=URL.createObjectURL(file);
      setimgOne({file, url});

    }
  };

  const profileChange=async () =>
  {
    try {
      const formData=new FormData();
      formData.append("img", imgOne.file);
      const url="http://localhost:8080/api/users/edituserprofilepic/"+userid;
      const {data: res}=await axios.put(url, formData, {headers: {"Content-Type": "multipart/form-data"}});
      settrigger(true);
      getuserdata();
    } catch(error) {
      if(error.response&&error.response.status>=400&&error.response.status<=500) {
        const message=error.response.data.message;
      }
    }
  };


  const getuserdata=async () =>
  {
    try {
      setLoading(true);
      const url="http://localhost:8080/api/users/userdata/"+userid;
      const {data: res}=await axios.get(url, {headers: {"Authorization": USERTOKEN}});
      const {PLANDATA, USERDATA, BIDCOUNT, CONTRACTHISTORY, POSTHISTORY}=res.data;
      setuserdata(USERDATA);
      setmobilenum(USERDATA.mobileNumber);
      setprofilephoto(USERDATA.profilephoto[0].url);
      setpremium(PLANDATA);
      setbidCount(BIDCOUNT);
      setcontractCount(CONTRACTHISTORY);
      setpostCount(POSTHISTORY);
      setLoading(false);

    } catch(error) {
      if(error.response&&error.response.status>=400&&error.response.status<=500) {
        const message=error.response.data.message;
      }
    }
  };

  const editing=() =>
  {
    Swal.fire({
      title: 'Are you sure for Edit?',
      text: "After there will be change in MiddlMan profile!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Edit it!'
    }).then((result) =>
    {
      if(result.isConfirmed) {
        setedit(true);
      }
    });
  };

  const onSubmit=async (data) =>
  {
    try {
      const url="http://localhost:8080/api/users/edituserprofile";
      const {data: res}=await axios.put(url, {data, userid});
      const {userInfo}=res.data;
      console.log(mobilenum);
      console.log(userInfo.mobileNumber);
      if(mobilenum===userInfo.mobileNumber) {
        setuserdata(userInfo);
        notificationSuccess(res.message);
        setedit(false);
      }
      else {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userID");
        notificationWarning("Mobile Number Changed ! Login Again");
        navigate("/");
      }

    } catch(error) {
      if(error.response&&error.response.status>=400&&error.response.status<=500) {
        const message=error.response.data.message;
      }
    }
  };

  if(Loading) {
    return (
      <>
        <Loader />
      </>);
  }

  return (
    <>
      <Navbar trigger={trigger} />
      {(userdata&&profilephoto||bidCount||postCount||contractCount||premium)? (<div class="container-fluid d-flex " >
        <div class="cardside">
          <div class="upper">
          </div>
          <div class="user text-center">
            <div class="profile">
              <img src={imgOne.url||profilephoto} class="rounded-circle" width="80" />
              <AddAPhotoRoundedIcon className='addimage' onClick={() => {inputImageTrigger(inputImageOne);}} />
              <input hidden ref={inputImageOne} type='file' name='fileOne' onChange={selectimgOne}></input>
            </div>
          </div>
          <div class="mt-5 text-center">
            <h4 class="mb-0">{userdata.userName}{(premium===true)&&(<VerifiedIcon style={{color: "blue"}} />)}</h4>
            {(premium===true)? (<span class="text-muted d-block mb-2" style={{marginTop: "13px"}}>Premium </span>)
              :
              (<span class="text-muted d-block mb-2" style={{marginTop: "13px"}}>Guest</span>)}
            <div class="d-flex justify-content-between align-items-center mt-4 px-4">
              <div class="stats">
                <h6 class="mb-0">Post</h6>
                <span>{postCount}</span>
              </div>
              <div class="stats">
                <h6 class="mb-0">Bid</h6>
                <span>{bidCount}</span>
              </div>
              <div class="stats">
                <h6 class="mb-0">Contracts</h6>
                <span>{contractCount}</span>
              </div>
            </div>
          </div>
        </div>

        {(edit)? (<div class="cardside1">
          <Box sx={{p: 6}}>
            <button class="btn btn-primary btn-sm follow" style={{marginLeft: "88%"}} onClick={handleSubmit(onSubmit)}>Save</button><br />
            <>
              <TextField
                margin="normal"
                fullWidth
                variant="standard"
                id="firstName"
                label="First Name"
                name="firstName"
                defaultValue={userdata.firstName}
                autoFocus
                required
                {...register("firstName", {required: true, maxLength: 10})}
              />
              {errors.firstName&&<p style={{fontSize: "8px", color: "red"}}>Please Enter Valid First Name</p>}
            </>
            <>
              <TextField
                margin="normal"
                fullWidth
                sx={{mt: 6}}
                variant="standard"
                id="lastName"
                label="Last Name"
                name="lastName"
                defaultValue={userdata.lastName}
                autoComplete="off"
                autoFocus
                {...register("lastName", {required: true, maxLength: 10})}
              />
              {errors.lastName&&<p style={{fontSize: "8px", color: "red"}}>Please Enter Valid Last Name</p>}
            </>

            <TextField
              margin="normal"
              fullWidth
              sx={{mt: 6}}
              variant="standard"
              id="email"
              label="Email Address"
              name="email"
              defaultValue={userdata.email}
              autoComplete="off"
              autoFocus
              {...register("email", {required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
            />
            {errors.email&&<p style={{fontSize: "8px", color: "red"}}>Please Enter Valid Email</p>}
            <TextField
              margin="normal"
              fullWidth
              sx={{mt: 6}}
              id="mobileNumber"
              variant="standard"
              label="Mobile Number"
              name="mobileNumber"
              defaultValue={userdata.mobileNumber}
              autoComplete="off"
              autoFocus
              {...register("mobileNumber", {required: true, pattern: /^[0-9+-]+$/, maxLength: 10})}
            />
            {errors.mobileNumber&&<p style={{fontSize: "10px", color: "red"}}>Please Enter Valid Mobile Number</p>}

          </Box>
        </div>):(<div class="cardside1">
          <Box sx={{p: 6}}>
            <button class="btn btn-primary btn-sm follow" style={{marginLeft: "88%"}} onClick={() => {editing();}}>Edit Profile</button><br />
            <>
              <TextField
                margin="normal"
                fullWidth
                variant="standard"
                id="firstName"
                label="First Name"
                name="firstName"
                disabled
                defaultValue={userdata.firstName}
              />
            </>
            <>
              <TextField
                margin="normal"
                fullWidth
                sx={{mt: 6}}
                variant="standard"
                id="lastName"
                label="Last Name"
                name="lastName"
                disabled
                defaultValue={userdata.lastName}
              />
            </>

            <TextField
              margin="normal"
              fullWidth
              sx={{mt: 6}}
              variant="standard"
              id="email"
              label="Email Address"
              name="email"
              disabled
              defaultValue={userdata.email}
            />
            <TextField
              margin="normal"
              fullWidth
              sx={{mt: 6}}
              id="mobileNumber"
              variant="standard"
              label="Mobile Number"
              name="mobileNumber"
              disabled
              defaultValue={userdata.mobileNumber}
            />
          </Box>
        </div>)}
      </div>):(<div style={{marginTop: "5%"}}></div>)}
    </>
  );

};

export default Userprofile;