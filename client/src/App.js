import React from 'react';
import { GET_USER } from './apollo/queries';
import { useQuery } from '@apollo/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center mt-3">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Age</th>
              <th scope="col">Company Name</th>
              <th scope="col">Company Description</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.users && (

                data.users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstname}</td>
                    <td>{user.age}</td>
                    <td>{user.company.name}</td>
                    <td>{user.company.description}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
