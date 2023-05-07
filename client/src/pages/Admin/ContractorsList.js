import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../reducers/alertsSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function ContractorsList() {
  const [contractors, setContractors] = useState([]);
  const dispatch = useDispatch();
  const getContractorsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("http://localhost:5000/api/admin/get-all-contractors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setContractors(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeContractorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "http://localhost:5000/api/admin/change-contractor-account-status",
        { contractorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getContractorsData();
      }
    } catch (error) {
      toast.error('Error changing doctor account status');
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getContractorsData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeContractorStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeContractorStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Contractors List</h1>
      <hr />
      <Table columns={columns} dataSource={contractors} />
    </Layout>
  );
}

export default ContractorsList;
