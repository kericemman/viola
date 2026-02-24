import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import Programs from "./pages/admin/Programs";
import Bookings from "./pages/admin/Bookings";
import Checkout from "./pages/public/Checkout";
import Success from "./pages/public/Success";
import PublicLayout from "./components/layouts/PublicLayout";
import Home from "./pages/public/Home";
import Contact from "./pages/public/Contact";
import Availability from "./pages/admin/Availability";
import Products from "./pages/admin/Product";
import PublicProducts from "./pages/public/PublicProduct";
import NewsletterForm from "./components/layouts/NewsletterModal";
import Newsletter from "./pages/admin/Newsletter";
import ProductDetails from "./pages/public/ProgramDetail";
import Service from "./pages/public/Service"
import ServiceRequests from "./pages/admin/Services";
import IndividualOrders from "./pages/admin/Orders";
import PeopleSystemsService from "./pages/public/People";
import OrganizationInquiries from "./pages/admin/Organization";
import OrganizationalCapacityAssessment from "./pages/public/orgCapacity";
import HRAuditCompliance from "./pages/public/HRAudit";
import RecruitmentAdvisory from "./pages/public/Recruitment";
import LeadershipPeopleStrategy from "./pages/public/Leadership";
import OrganizationalDevelopment from "./pages/public/OrgDevelopment";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <NewsletterForm />
        <Routes>
        
          <Route element={<PublicLayout/>}>
            
          
            <Route path="/" element={<Home/>}/>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/services" element={<Service />}/>
            <Route path="/product" element={<PublicProducts/>}/>
            <Route path="/:id" element={<ProductDetails/>}/>
            <Route path="/services/org/people-systems" element={<PeopleSystemsService/>}/>
            <Route path="/services/org/capacity-assessment" element={<OrganizationalCapacityAssessment/>}/>
            <Route path="/services/org/hr-audit" element={<HRAuditCompliance/>}/>
            <Route path="/services/org/recruitment-advisory" element={<RecruitmentAdvisory/>}/>
            <Route path="/services/org/leadership-strategy" element={<LeadershipPeopleStrategy/>}/>
            <Route path="/services/org/organizational-development" element={<OrganizationalDevelopment/>}/>
            

          
         
          </Route>
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/requests" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
          <Route path="/admin/programs" element={<ProtectedRoute><Programs /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/admin/availability" element={<ProtectedRoute><Availability /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/admin/newsletters" element={<ProtectedRoute><Newsletter /></ProtectedRoute>} />
          <Route path="/admin/individual" element={<ProtectedRoute><IndividualOrders /></ProtectedRoute>} />
          <Route path="/admin/organization" element={<ProtectedRoute><OrganizationInquiries/></ProtectedRoute>}/>
          
          </Routes>
          </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
