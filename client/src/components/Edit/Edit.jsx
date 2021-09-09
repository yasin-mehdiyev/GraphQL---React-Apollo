import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { GET_COMPANIES, GET_USER, GET_USER_BY_ID, UPDATE_USER } from "../../apollo/queries";
import { toast } from 'react-toastify';

const Edit = () => {
  
  // UseParams with React-Router-Dom
  const { id } = useParams();

  // Queries and Mutations
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const companies = useQuery(GET_COMPANIES);
  const [updateUser, update] = useMutation(UPDATE_USER);

  // Using State
  const [datas, setDatas] = useState({
    id: '',
    firstname: '',
    age: '',
    companyId: ''
  });

  // Using UseEffect when onChange data state
  useEffect(() => {
    if(data !== undefined){
      setDatas({
        id: data.user.id,
        firstname: data.user.firstname,
        age: data.user.age,
        companyId: data.user.company.id,
      })
    }
  }, [data])

  // Using History
  const history = useHistory();

  if (loading || companies.loading || update.loading) return "Loading...";
  if (error || companies.error || update.error) return `Error! ${error.message}`;

  // Input Change Event
  const onChangeHandler = (name, value) => {
    const latestData = { ...datas, [name]: value };
    setDatas(latestData);
  };

  // Update Form Submit Event
  const onUpdateHandler = (ev) => {
    ev.preventDefault();

    if (datas.firstname !== "" && datas.age !== "" && datas.companyId !== "") {

      updateUser({
        variables: {
          id: datas.id,
          firstname: datas.firstname,
          age: parseInt(datas.age),
          companyId: datas.companyId,
        },
        refetchQueries: [{ query: GET_USER }]
      }).then(()=>history.push('/users'));

      toast.success('Successfully updated user');

      setDatas({
        firstname: "",
        age: "",
        companyId: "",
      });

    }
    else{
        toast.warning('Any data is empty...');
    }
  }

  return (
    <div>
      <h2 className="text-center mt-3 mb-3">Edit User Form</h2>

      <div className="d-flex justify-content-center align-items-center">
        <form className="w-50" onSubmit={onUpdateHandler}>
          <div className="form-group">
            <label for="firstname" className="mb-2">
              Firstname
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={datas.firstname}
              placeholder="Enter Firstname"
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label for="age" className="mb-2 mt-2">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={datas.age}
              placeholder="Enter Age"
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="mb-2 mt-2">Company Name</label>

            <select
              class="form-select"
              name="companyId"
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            >
              {companies.data.companies.map((company) => (
                <option selected={data.user.company.id === company.id ? true : false} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3 text-uppercase">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
