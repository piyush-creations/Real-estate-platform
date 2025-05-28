import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import PropertyScrollList from './components/PropertyScrollList/PropertyScrollList.jsx';
// import FAQ from './components/FAQ/FAQ.jsx';
import Singlepage from './components/SinglePage/Singlepage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import PropertyList from './components/PropertyList/PropertyList.jsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';
import about from './components/About/About.jsx'; // Import the About component
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ComparisonPage from './components/ComparisonPage/comparisonPage.jsx'; // Import the comparison page
import { ComparisonProvider } from './context/ComparisonContext'; // Import the context provider
// import Services from './components/Services/Services.jsx';
import ContactNowPage from './components/ContactUS/ContactUS.jsx';
import SavedProperties from './components/SavedProperties/savedProperties';
import FormPage from './components/FormPage/FormPage.jsx';
import EditProfile from './components/EditProfile/EditProfile.jsx';
import EditProperty from './components/EditProperties/EditProperty.jsx';
import  Why from './components/Why/Why.jsx';
import Frontarea from './components/Frontarea/frontarea.jsx';
import AreaConverter from './components/AreaConverter/areaconverter.jsx';



function App() {
  return (
    <Router>
      <ComparisonProvider> {/* Wrap the app in the ComparisonContext.Provider */}
        <div className="App">
          <Navbar />
          <div className="main-content-wrapper">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Why />
                  <div className="scroll-list">
                    <PropertyScrollList />
                  </div>
                  
                  <Frontarea />
                  <FAQ />
                  <Services />
                  <Footer />
                </>
              }
            />
            <Route path ="/contact" element={<ContactNowPage/>} />
            <Route path='/listed-properties' element={<Listedproperties />} />
            <Route path='/EditProperty/:id' element={<EditProperty />} />
            {/* Property Details Page */}
            <Route path="/singlepage/:id" element={<Singlepage />} />
            {/* Single Page */}
            {/* <Route path="/singlepage" element={<Singlepage />} /> */}
            <Route path="/saved-posts" element={<SavedProperties />} />
            {/* Property list Pages */}
            <Route path="/property-list" element={<PropertyList />} /> 
            {/* Login Pages */}
            <Route path="/signin" element={<LoginPage isSignUp={false} />} />
            <Route path="/signup" element={<LoginPage isSignUp={true} />} />
            <Route path="/formpage" element={<FormPage />}/>
            
            <Route 
               path='/dashboard'
               element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
               }/>
            {/* Comparison Page Route */}
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route 
              path="/edit-profile" 
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
              <Route path="/frontarea" element={<Frontarea />} />
              <Route path="/area-converter" element={<AreaConverter />} />
              <Route path="/about" element={<About />} />
            <Route path="/" element={<Header />} />
            {/* <Route path="/results" element={<ResultsPage />} /> */}
          </Routes>
          </div>
        </div>
      </ComparisonProvider>
    </Router>
  );
}

export default App;
