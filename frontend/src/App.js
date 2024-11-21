// React Specific Components
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Custom Imports
import CourseList from "./components/CourseList";
import Header from "./components/Header";
import CourseDetails from "./pages/CourseDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
