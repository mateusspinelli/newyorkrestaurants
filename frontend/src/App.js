import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import NYRestaurntLogo from "./img/salad.png"
import "./css/reset.css"
import "./css/app.css"

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <header className="header">
        <Link to={"/"} className="headerLink">
        <img src={NYRestaurntLogo} className="headerLogo"></img>
        </Link>
                
        <h1 className="headerTitle">
          <Link to={"/"} className="headerLink">
            New York Restaurants
          </Link>
        </h1>
        
        
        { user ? (
          <button onClick={logout} className="headerBtn" style={{cursor:'pointer'}}>
            <p className="headerBtnText">
            {user.name}
            </p>
            <p className="headerBtnText">
            LOGOUT
            </p>
          </button>
        ) : (      
                
        <Link to={"/login"}>
          <button className="headerBtn">
          <p className="headerBtnText">
          LOGIN
          </p>
          </button>
        </Link>
        
        )}
        

      </header>

      <div>
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;