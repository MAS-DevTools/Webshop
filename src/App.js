import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import CSSProps from "./data/constants/CSSProps";
import Paths from "./data/constants/Paths";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Servicedesk from "./pages/servicedesk/Servicedesk";
import LogOut from "./pages/logout/LogOut";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Products from "./pages/products/Products";
import UserControl from "./components/usercontrol/UserControl";
import Footer from "./components/footer/Footer";
import { Base } from "./components/Base";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { RegisterModel } from "./data/models/RegisterModel";

const App = () => {
  
  let sidebar;
  let hostCSS="";
  const [token, setToken] = useState(null);

  useEffect(() => {
    Base.prototype.getToken().then((result)=>{        
      if(token === null|| (token && !result)){
        setToken(result);
      }
      
    });
  }, [ token, setToken]);

  if (token) {
    sidebar = <Sidebar />;
    hostCSS = " loginBarVisible ";
  }

  function onSucces(){
    alert("Login succes!");
  }

  function onFail(){
    alert("Login failed!");
  }

  return (
    <Suspense fallback="loading">
      <Router>
        <div className={CSSProps.Style.App}>
          <Navbar />
          <UserControl />
          {sidebar}
          <div className={CSSProps.Style.Host + hostCSS}>
            <div className={CSSProps.Style.Hostbody}>
              <Switch>
                <Route exact path={Paths.Home}>
                  <Home />
                </Route>
                <Route exact path={Paths.Servivedesk}>
                  <Servicedesk />
                </Route>
                <Route exact path={Paths.Cart}>
                  <Cart />
                </Route>
                <Route exact path={Paths.LogOut}>
                  <LogOut />
                </Route>
                <Route exact path={Paths.Orders}>
                  <Orders />
                </Route>
                <Route exact path={Paths.Profile}>
                  <Profile />
                </Route>
                <Route exact path={Paths.Login}>
                  <Login RegisterModel={RegisterModel} IsOrder={false} OnSuccesCallback={onSucces} OnFailCallback={onFail}/>
                </Route>
                <Route exact path={Paths.Settings}>
                  <Settings />
                </Route>
                <Route exact path={Paths.Products}>
                  <Products />
                </Route>
                <Route path={Paths.Products + "/:category"}>
                  <Products />
                </Route>
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
