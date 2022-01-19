import React from 'react';
import { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../actions/userActions' 
function Header(){
   
  const dispatch = useDispatch();
   const {user,loading} = useSelector(state=>state.auth)
   const {cartItems} = useSelector(state=>state.cart)
   
  const logoutHandler =()=>{
    dispatch(logout());
  }
  return(
      
<Fragment>
  <nav style={{height:'80px'}}className="navbar navbar-expand-lg navbar-dark bg-dark">
   <Link to={'/'} class="navbar-brand" >
    <img src="https://groww.in/logo-groww270.png" width="50" height="50" alt=""/>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="nav navbar-nav mr-auto">
      <li className="nav-item">
      <Link to={'/explore'} className="nav-link">Explore</Link>
        </li>
      <li className="nav-item">
        <Link to={'/about'} className="nav-link">About</Link>
      </li>
      <li className="nav-item">
        <Link to={'/faqs'} className="nav-link">FAQs</Link>
      </li>
    </ul>
        {user?(
          
          <div className="ml-4 dropdown d-inline">
            <Link to='/cart' style={{paddingRight:'10px'}}>
            <span id="cart" class="ml-3">Cart</span>
        <span class="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
            <Link to="#!" className="btn dropdown-toggle text-white"
            type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              <span>{user && user.name}</span>
             
          
</Link>
<div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
<Link className="dropdown-item text-danger" to="/orders/me"> My Orders</Link>
  <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
    Logout
  </Link>
  </div>
</div>

        ) : !loading && 
        <ul class="nav navbar-nav navbar-right">
          <li style={{paddingTop:'8px',paddingRight:'10px'}}>
          <span id="cart" class="ml-3">Cart</span>
        <span class="ml-1" id="cart_count">0</span>
          </li>
      <li>
      <Link to='/login' className="nav-link">Login</Link>
        </li>
        <li>
        <Link to={'/register'} className="nav-link">Register</Link></li>
        </ul>
        }
    
   
  </div>
</nav>
</Fragment>

)
    }
export default Header; 

