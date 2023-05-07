import React from "react";
import { useNavigate } from "react-router-dom";

function Contractor({ contractor }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${contractor._id}`)}
    >
      <h1 className="card-title">
        {contractor.firstName} {contractor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {contractor.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {contractor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {contractor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {contractor.timings[0]} - {contractor.timings[1]}
      </p>
    </div>
  );
}

export default Contractor;
