import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginAdmin from './Components/Admin/LoginAdmin';
import Chat from './Components/Chat';
import ErrorPage from './Components/EorrorPage';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import DashboardAdmin from './Pages/Admin/DashboardAdmin';
import PostManagment from './Pages/Admin/PostManagment';
import UserManagement from './Pages/Admin/UserManagement';
import Transactions from './Pages/Admin/Transactions';
import Reports from './Pages/Admin/Reports';
import PostAdding from './Pages/User/PostAdding';
import PostDetails from './Pages/User/PostDetails';
import UserHome from './Pages/User/UserHome';
import Viewall from './Pages/User/Viewall';
import PremiumPlan from './Pages/User/PremiumPlan';
import BidHistory from './Pages/User/BidHistory';
import UserPost from './Pages/User/UserPost';
import ContractAdmin from './Pages/Admin/ContractAdmin';
import Contractshowing from './Pages/User/Contractshowing';
import Profile from './Pages/User/Profile';


function App ()
{
  return (
    <>
      <Router>
        <Routes>

          {/* User Related Route  */}
          <Route exact path='/homepage' element={<UserHome />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/' element={<Login />} />
          <Route exact path='/viewpost/:id' element={<PostDetails />} />
          <Route exact path='/chat' element={<Chat />} />
          <Route exact path='/allpost' element={<Viewall />} />
          <Route exact path='/newpost' element={<PostAdding />} />
          <Route exact path='/premiumplan' element={<PremiumPlan />} />
          <Route exact path='/bidhistory' element={<BidHistory />} />
          <Route exact path='/userpostcorno' element={<UserPost />} />
          <Route exact path='/contractshow' element={<Contractshowing />} />
          <Route exact path='/profile' element={<Profile />} />

          {/* 404 Error Page */}
          <Route path="*" element={<ErrorPage />}></Route>


          {/* Admin Related Route */}
          <Route exact path='/adminlogin' element={<LoginAdmin />} />
          <Route exact path='/dashboard' element={<DashboardAdmin />} />
          <Route exact path='/postmanagement' element={<PostManagment />} />
          <Route exact path='/usermanagement' element={<UserManagement />} />
          <Route exact path='/transactions' element={<Transactions />} />
          <Route exact path='/reports' element={<Reports />} />
          <Route exact path='/contracts' element={<ContractAdmin />} />


        </Routes>
      </Router>
    </>
  );
};
export default App;
