import React,{Fragment,useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import MetaData from '../layout/MetaData'
import {register,clearErrors} from '../../actions/userActions'

const Register = ({history}) => {

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        avatarimageurl:''
    });
    const {name,email,password,avatarimageurl} = user;
    const dispatch = useDispatch();

    const {isAuthenticated,error} = useSelector(state => state.auth)
    useEffect(() => {
        
        if(isAuthenticated)
        {
            history.push('/');
        }
        if(error)
        {
            dispatch(clearErrors())
        }

    },[dispatch,error,isAuthenticated,history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData  = new FormData();
         formData.set('name',name);
         formData.set('email',email);
         formData.set('password',password);
         formData.set('avatarimageurl',avatarimageurl);
        dispatch(register(formData));
    }

    const onChange = e => {
            setUser({...user,[e.target.name]:e.target.value})
        }

    return(
        <Fragment>
            <MetaData title={'Register Page'}/>
            <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" name='name' value={name} onChange={onChange} />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
                 value={email}
                  onChange={onChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name='password'
                 value={password}
                  onChange={onChange}
              />
            </div>

            <div className="form-group">
            <label htmlFor="avatarimageurl_field">avatarimageurlImageURL</label>
            <input type="avatarimageurl" id="avatarimageurl_field" className="form-control" name='avatarimageurl' value={avatarimageurl} onChange={onChange} />
          </div>
          
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
        </Fragment>
    )
}

export default Register;