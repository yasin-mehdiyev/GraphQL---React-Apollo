import React, { Suspense } from "react";

// Components
import Container from "./components/UI/Container";

// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// React-Router-Dom
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

// Includes Lazy Loadings (Code Splitting)
const Home = React.lazy(() => import("./pages/Detail/DetailPage"));
const Create = React.lazy(() => import("./pages/Create/CreatePage"));
const Details = React.lazy(() => import("./pages/UserDetail/UserDetailPage"));
const Update = React.lazy(() => import('./pages/Edit/EditPage'));

const App = () => {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <Route path="/users" exact>
              <Home />
            </Route>

            <Route path="/users/new">
              <Create />
            </Route>

            <Route path="/users/edit" exact>
              <Redirect to="/users" />
            </Route>

            <Route path="/users/edit/:id">
              <Update />
            </Route>

            <Route path="/users/:id">
              <Details />
            </Route>

            <Route path="/" exact>
              <Redirect to="/users" />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </Container>
  );
};

export default App;
