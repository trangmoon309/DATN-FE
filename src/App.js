import { Route } from "react-router";
import "./App.css";
import SignInPage from "./pages/User/SignInPage";
import { Switch } from "react-router-dom";
import VehicleLineList from './pages/VehicleLine/VehicleLineListPage';
import VehicleTypeList from "./pages/VehicleType/VehicleTypeListPage";
import VehicleDetail from "./pages/Vehicle/VehicleDetail/VehicleDetailPage";
import VehicleList from "./components/VehicleField/VehhicleList";
import TransactionList from "./pages/Transaction/TransactionListPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProfilePage from "./pages/User/ProfilePage";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <VehicleList></VehicleList>
      </Route>
      <Route exact path="/dashboard">
        <Dashboard></Dashboard>
      </Route>
      <Route exact path="/signin">
        <SignInPage></SignInPage>
      </Route>
      <Route exact path="/vehicle-type">
        <VehicleTypeList></VehicleTypeList>
      </Route>
      <Route exact path="/vehicle-line">
        <VehicleLineList></VehicleLineList>
      </Route>
      <Route exact path="/vehicle">
        <VehicleList></VehicleList>
      </Route>
      <Route exact path="/details/:id">
        <VehicleDetail/>
      </Route>
      <Route exact path="/transaction">
        <TransactionList></TransactionList>
      </Route>
      <Route exact path="/dashboard">
        <Dashboard></Dashboard>
      </Route>
      <Route exact path="/profile">
        <ProfilePage></ProfilePage>
      </Route>
      <Route exact path="/cart">
        <Cart></Cart>
      </Route>
      <Route exact path="/cart/success">
        <Cart></Cart>
      </Route>
    </Switch>
  );
}

export default App;
