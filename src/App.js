import { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import CSSProps from "./data/constants/CSSProps";
import Paths from "./data/constants/Paths";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Servicedesk from "./pages/servicedesk/Servicedesk";
import Organisation from "./pages/organisation/Organisation";
import Tasks from "./pages/tasks/Tasks";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Services from "./pages/services/Services";
import UserControl from "./components/usercontrol/UserControl";
import Footer from "./components/footer/Footer";

const App = () => {
  const [token, setToken] = useState();
  let sidebar;
  if (!token) {
    sidebar = <Sidebar />;
  }

  return (
    <Suspense fallback="loading">
      <Router>
        <div className={CSSProps.Style.App}>
          <Navbar />
          <UserControl />
          {sidebar}
          <div className={CSSProps.Style.Host}>
            <div className={CSSProps.Style.Hostbody}>
              <Switch>
                <Route exact path={Paths.Home}>
                  <Home />
                </Route>
                <Route exact path={Paths.Servivedesk}>
                  <Servicedesk />
                </Route>
                <Route exact path={Paths.About}>
                  <About />
                </Route>
                <Route exact path={Paths.Organisation}>
                  <Organisation />
                </Route>
                <Route exact path={Paths.Tasks}>
                  <Tasks />
                </Route>
                <Route exact path={Paths.Dashboard}>
                  <Dashboard />
                </Route>
                <Route exact path={Paths.Profile}>
                  <Profile />
                </Route>
                <Route exact path={Paths.Login}>
                  <Login setToken={setToken} />
                </Route>
                <Route exact path={Paths.Settings}>
                  <Settings />
                </Route>
                <Route exact path={Paths.Services}>
                  <Services />
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
