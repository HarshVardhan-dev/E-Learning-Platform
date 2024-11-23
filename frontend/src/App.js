// React Specific Components
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Custom Imports
import CourseList from "./components/CourseList";
import Header from "./components/Header";
import CourseDetails from "./pages/CourseDetails";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Page with Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <CourseList />
            </>
          }
        />

        {/* Other Routes */}
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
