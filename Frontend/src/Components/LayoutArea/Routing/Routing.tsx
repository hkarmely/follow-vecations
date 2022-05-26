import { Routes, Route, Navigate } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Page404 from "../Page404/Page404";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import authService from "../../../Services/AuthService";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/Store";
import AdminPanel from "../../AdminArea/AdminPanel/AdminPanel";
import UpdateVacation from "../../AdminArea/UpdateVacation/UpdateVacation";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import VacationDetails from "../../HomeArea/VacationDetails/VacationDetails";
import Home from "../../HomeArea/Home/Home";
import Reports from "../../AdminArea/Reports/Reports";

function Routing(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdminLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {

        const unsubscribeMe = authStore.subscribe(() => {
          setIsLoggedIn(authService.isLoggedIn());
          setIsAdminLoggedIn(authService.isAdmin());
        });
        return () => unsubscribeMe();
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Routes>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      {/* <Route path="/home" element={(isAdmin || isLoggedIn) ? <Home /> : <Navigate to="/login" />} /> */}
      <Route path="/home" element={<Home /> } />
      {/* <Route path="/admin-panel" element={isAdmin ? <AdminPanel /> : <Navigate to="/login" />} /> */}
      <Route path="/admin-panel" element={<AdminPanel />} />
      {/* <Route path="/reports" element={isAdmin ? <Reports /> : <Navigate to="/login" />} /> */}
      <Route path="/reports" element={<Reports /> } />
      {/* <Route path="/vacations/update/:id" element={isAdmin ? <UpdateVacation /> : <Navigate to="/login" />} /> */}
      <Route path="/vacations/update/:id" element={<UpdateVacation />} />
      {/* <Route path="/vacations/new" element={isAdmin ? <AddVacation /> : <Navigate to="/login" />} /> */}
      <Route path="/vacations/new" element={<AddVacation />} />
      <Route path="/vacations/details/:id" element={<VacationDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Page not found route - must be last route: */}
      <Route path="*" element={<Page404 />} />

    </Routes>
  );
}

export default Routing;
