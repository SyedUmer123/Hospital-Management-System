import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LogIn from "./logIn.js";
import CreateAccount from "./CreateAccount.js";
import SchedulingAppt from "./schedulingAppt.js";
import ViewMedHist from "./ViewMedHist.js";
import DocHome from "./DocHome.js";
import ViewOneHistory from "./ViewOneHistory.js";
import Settings from "./Settings.js";
import DocSettings from "./DocSettings.js";
import AdminSettings from "./AdminSettings.js";
import PatientsViewAppt from "./PatientsViewAppt.js";
import NoMedHistFound from "./NoMedHistFound.js";
import DocViewAppt from "./DocViewAppt.js";
import MakeDoc from "./MakeDoc.js";
import Diagnose from "./Diagnose.js";
import ShowDiagnoses from "./ShowDiagnoses.js";
import ViewDoctors from "./ViewDoctors.js";
import ViewPatients from "./ViewPatients.js";
import AdminHome from "./AdminHome.js";
import ViewDoctorsAdmin from "./ViewDoctorsAdmin.js";
import AssignDepartment from "./AssignDepartment.js";
import AddSchedule from "./AddSchedule.js";
import DoctorSchedule from "./DoctorSchedule .js";
import AdminLoginLogs from "./adminlogins.js";
import PaymentPage from "./PaymentPage.js";

export default function App() {
  let [component, setComponent] = useState(<LogIn />);

  useEffect(() => {
    fetch("http://localhost:3001/userInSession")
      .then((res) => res.json())
      .then((res) => {
        let string_json = JSON.stringify(res);
        let email_json = JSON.parse(string_json);
        let email = email_json.email;
        let who = email_json.who;
        if (email === "") {
          setComponent(<LogIn />);
        } else {
          if (who === "pat") {
            setComponent(<Home />);
          } else if (who === "admin") {
            setComponent(<AdminHome />);
          } else {
            setComponent(<DocHome />);
          }
        }
      });
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/NoMedHistFound" element={<NoMedHistFound />} />
          <Route path="/MakeDoc" element={<MakeDoc />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/MedHistView" element={<ViewMedHist />} />
          <Route path="/scheduleAppt" element={<SchedulingAppt />} />
          <Route path="/showDiagnoses/:id" element={<ShowDiagnoses />} />
          <Route path="/Diagnose/:id" element={<Diagnose />} />
          <Route path="/ViewOneHistory/:email" element={<ViewOneHistory />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/createAcc" element={<CreateAccount />} />
          <Route path="/ViewDoctors" element={<ViewDoctors />} />
          <Route path="/DocHome" element={<DocHome />} />
          <Route path="/PatientsViewAppt" element={<PatientsViewAppt />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminSettings" element={<AdminSettings />} />
          <Route path="/ViewDoctorsAdmin" element={<ViewDoctorsAdmin />} />
          <Route path="/ViewPatients" element={<ViewPatients />} />
          <Route path="/DocSettings" element={<DocSettings />} />
          <Route path="/AssignDepartment" element={<AssignDepartment />} />
          <Route path="/ApptList" element={<DocViewAppt />} />
          <Route path="/AddSchedule" element={<AddSchedule />} />
          <Route path="/DoctorSchedule" element={<DoctorSchedule />} />
          <Route path="/AdminLoginLogs" element={<AdminLoginLogs />} />
          <Route path="/PaymentPage/:id" element={<PaymentPage />} />
          <Route path="/" element={component} />
        </Routes>
      </div>
    </Router>
  );
}
