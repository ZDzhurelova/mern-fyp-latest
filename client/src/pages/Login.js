import React from 'react'
import '../index.css';
import {Form, Input, Button} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-hot-toast';
import {useDispatch, useSelector} from "react-redux";
import { showLoading, hideLoading } from '../reducers/alertsSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Function that will return the values from the form into the console
  const onFinish = async(values) => {
    // console.log("Received values from form: ", values)
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:5000/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success){
        toast.success(response.data.message);
        //Specify what information will be taken from the local storage.
        //Based on the token the authorization will be approved by the protected routes.
        //Whatever data will be taken from backend will be stored in the local storage and then the user will be navigated to the dashboard page
        localStorage.setItem("token", response.data.data);
        navigate("/");
      }else {
        toast.error(response.data.message);

      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='register-form'> 
      <div className = 'authentication'>
        <div className ='authenticationForm card p-3'>
          <h1 className = 'cardTitle'>Login</h1>
          {/* Add an onFinish function to the form */}
          <Form layout = 'vertical' onFinish = {onFinish}>
          {/* add props into form item */}
          <Form.Item label = 'Email' name = 'email'>
            <Input placeholder = 'Email'/>
          </Form.Item>
          <Form.Item label = 'Password' name = 'password'>
            <Input placeholder = 'Password' type = 'password'/>
          </Form.Item>

          {/* Add a prop htmlTyle */}
          <Button className='primary-button my-3' htmlType='submit'>Login</Button>

          <Link className = 'anchor' to='/register'>Don't have an account yet?</Link>
        
        </Form>
      </div>
    </div>
  </div>
  );
}

export default Login;

