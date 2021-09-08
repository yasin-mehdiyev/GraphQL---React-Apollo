import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { CREATE_USER, GET_COMPANIES, GET_USER } from "../../apollo/queries";

const Create = () => {
  //   Using State
  const [datas, setDatas] = useState({
    firstname: "",
    age: "",
    companyId: "",
  });

//   Using History
  const history = useHistory();

  //   Using Mutation and UseQuery
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const companies = useQuery(GET_COMPANIES);

  if (loading || companies.loading) return "Loading data...";
  if (error || companies.error) return `Submission error! ${error.message}`;

  //   Input Change Event
  const onChangeHandler = (name, value) => {
    const latestData = { ...datas, [name]: value };
    setDatas(latestData);
  };

  //   Submit event
  const onSubmitHandler = (ev) => {
    ev.preventDefault();

    if (datas.firstname !== "" && datas.age !== "" && datas.companyId !== "") {

      createUser({
        variables: {
          firstname: datas.firstname,
          age: parseInt(datas.age),
          companyId: datas.companyId,
        },
        refetchQueries: [{ query: GET_USER }]
      }).then(()=>history.push('/users'));

      setDatas({
        firstname: "",
        age: "",
        companyId: "",
      });

    }
    else{
        console.log('Any data is empty...')
    }
  };

  return (
    <React.Fragment>
      <h2 className="text-center mt-3 mb-3">New User Form</h2>

      <div className="d-flex justify-content-center align-items-center">
        <form className="w-50" onSubmit={onSubmitHandler}>
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
              <option selected disabled>
                Select Company Name
              </option>
              {companies.data.companies.map((company) => (
                <option value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Create
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Create;
