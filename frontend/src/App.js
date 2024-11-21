// React Specific Components
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Custom Imports
import CourseList from "./components/CourseList";
import Header from "./components/Header";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
