import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_USER_BY_ID } from "../../apollo/queries";

const Detail = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
      <div className="row">
          <div className="col-md-12 mt-4">
              <h2 className="text-center mb-4">User Detail</h2>
          </div>
          <div className="col-md-12 d-flex align-items-center justify-content-center">
            <ul class="list-group" style={{width: '40%', textAlign: 'center'}}>
                    <li class="list-group-item"> Firstname: <b>{data.user.firstname}</b> </li>
                    <li class="list-group-item"> Age: <b>{data.user.age}</b> </li>
                    <li class="list-group-item"> Company Name: <b>{data.user.company.name}</b> </li>
                    <li class="list-group-item">Company Description: <b>{data.user.company.description}</b> </li>
                </ul>
          </div>
      </div>
  );
};

export default Detail;
