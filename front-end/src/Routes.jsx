import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Homepage/Homepage";
import Login from "./Pages/LoginPage/Login";
import StockForm from './Pages/Forms/StockForm';
import OptionForm from './Pages/Forms/OptionForm';
import RealEstateForm from './Pages/Forms/RealEstateForm';

const Routes = () => {
  const [username, setUsername] = useState(window.localStorage.getItem("username"))

  useEffect(() => {
    setUsername(window.localStorage.getItem("username"))
  })

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path='/stock' component={StockForm} />
        <Route path='/addOption' component={OptionForm} />
        <Route path='/addRealEstate' component={RealEstateForm} />
        <Route path="/" component={Login} />
      </Switch>{" "}
    </BrowserRouter>
  );
};

export default Routes;