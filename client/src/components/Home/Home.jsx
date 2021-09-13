import React from "react";

// React Apollo Client
import { GET_USER, DELETE_USER } from "../../apollo/queries";
import { useMutation, useQuery } from "@apollo/client";

// React Icons
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";

// CSS Files
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

// Export to Excel File
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Home = () => {
  // Using Mutation and Queries
  const { loading, error, data } = useQuery(GET_USER);
  const [deleteUser, deletedUser] = useMutation(DELETE_USER);

  if (loading || deletedUser.loading) return "Loading...";
  if (error || deletedUser.error) return `Error! ${error.message}`;

  // Removing click event
  const onRemoveHandler = (userId) => {
    deleteUser({
      variables: {
        id: userId,
      },
      refetchQueries: [
        {
          query: GET_USER,
        },
      ],
    });
  };

  return (
    <React.Fragment>
      <h2 className="text-center mt-3">User List</h2>

      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div style={{ marginRight: "10px" }}>
            <button className="btn btn-primary">Filter</button>
          </div>

          <ReactHTMLTableToExcel
            className="btn btn-info mr-3"
            table="table-to-xls"
            filename="tablexls"
            sheet="Sheet"
            buttonText="Export to Excel"
          />
        </div>
        <Link to="/users/new">
          <button className="btn btn-primary">Create New User</button>
        </Link>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-3">
        <table className="table" id="table-to-xls">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Age</th>
              <th scope="col">Company Name</th>
              <th scope="col">Company Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.users &&
              data.users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstname}</td>
                  <td>{user.age}</td>
                  <td>{user.company.name}</td>
                  <td>{user.company.description}</td>
                  <td className={classes.actions}>
                    <div>
                      <Link to={`/users/edit/${user.id}`}>
                        <AiFillEdit />
                      </Link>
                    </div>
                    <div>
                      <Link to={`/users/${user.id}`}>
                        <AiFillEye />
                      </Link>
                    </div>
                    <div onClick={() => onRemoveHandler(user.id)}>
                      <AiFillDelete />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Home;
