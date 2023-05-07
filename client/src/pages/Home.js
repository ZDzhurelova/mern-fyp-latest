import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Contractor from "../components/Contractor";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../reducers/alertsSlice";

function Home() {
    const [contractors, setContractors] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('http://localhost:5000/api/user/get-all-approved-contractors', {
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('token'),
                },
            });
            dispatch(hideLoading())

            if(response.data.success) {
                setContractors(response.data.data);
            }

           
        } catch (error) {
            dispatch(hideLoading())
        }
    };
    //Get user info by id
    // useEffect(() => {
    //     getData();
    // }, []);
    return ( 
    <Layout>
        <Row gutter={20}>
            {contractors.map((contractor) => (
            <Col span={8} xs={24} sm={24} lg={8}>
                <Contractor contractor={contractor} />
            </Col>
            ))}
      </Row>
    </Layout>
    );

}

export default Home;