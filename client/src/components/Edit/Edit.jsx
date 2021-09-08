import React from "react";

const Edit = () => {
  return (
    <div>
      <h2 className="text-center mt-3 mb-3">Edit User Form</h2>

      {/* <div className="d-flex justify-content-center align-items-center">
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
      </div> */}
    </div>
  );
};

export default Edit;
