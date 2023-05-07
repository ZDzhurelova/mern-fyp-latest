import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { setUser } from '../reducers/userSlice';
import { hideLoading, showLoading } from '../reducers/alertsSlice';

//Functional Component where we will receive props
function ProtectedRoute(props) {
    //Get user from reducer
    const {user} = useSelector((state) => state.user);

    //If anything goes wrong navigate to login page
    const navigate = useNavigate();
    //
    const dispatch = useDispatch();
    //Get user acync function
    const getUser = async() => {
        try {
            dispatch(showLoading())
            //This user info is taken fron the backend routes-> userRoute
            const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id',{token : localStorage.getItem('token')}, {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());

            debugger;

            if (response.data.success) {
                dispatch(setUser(response.data.data));
            }
            else {
                //If there is any token mistake go to login
                localStorage.clear();
                navigate("/login");

            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            navigate("/login");
        }

    };
    // API call to get the user details
    useEffect(() => {
        //If tehre is no user we will have a API call to get user
        if(!user){
            getUser();
        }
    }, [user]);
    

    if (localStorage.getItem('token')) {
        return props.children;

    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;