import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DoctorDashboard from "./doctors_panel/DoctorDashboard";
import DoctorLogin from "./doctors_panel/DoctorLogin";
import Layout from "./admin/layout";
// import BookAppointmentModal from "./pages/BookAppointmentModal";
// import HeaderBanner from "./pages/HeaderBanner"
// import About from "./pages/About";
// import Services from "./pages/Services";
// import BookAppointment from "./pages/BookAppointment";
// import Contact from "./pages/Contact";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import DoctorDashboard from "./pages/doctor/DoctorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/doctor" element={<DoctorDashboard/>} />
        <Route path="/login" element={<DoctorLogin/>} />
        <Route path="/admin" element={<Layout/>} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/book-appointment" element={<BookAppointmentModal />} /> */}
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
