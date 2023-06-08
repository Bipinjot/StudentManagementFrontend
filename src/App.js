import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddCourse from "./Pages/AddCourse";
import AddResult from "./Pages/AddResult";
import AddStudent from "./Pages/AddStudent";
import CourseList from "./Pages/CourseList";
import StudentList from "./Pages/StudentList";
import Results from "./Pages/Results";
import Navbar from "./Components/Navbar";
import React from "react";

function App() {
  return (
    <div className="flex flex-row">
      <div className="flex basis-1/4"> <Navbar/></div>
      <div className="flex basis-3/4 h-full">
      <main className="pt-20">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/addCourse" element={<AddCourse/>} />
          <Route path="/courseList" element={<CourseList/>} />
          <Route path="/addStudent" element={<AddStudent/>} />
          <Route path="/studentList" element={<StudentList/>} />
          <Route path="/addResult" element={<AddResult/>} />
          <Route path="/results" element={<Results/>} />
        </Routes>
      </main>
      </div>
      
    </div>
    //     <div>
    //     <Navbar/>
    //     <main className='pt-20'>
    //     <Routes>
    //     <Route exact path="/" element={<Home/>} />
    //     <Route path="/home" element={<Home/>} />
    //     <Route path="/travel" element={<Travel/>} />
    //     <Route path="/offers" element={<Offers/>} />
    //     <Route path="/Contact" element={<Contact/>} />
    // </Routes>
    // </main>
    // </div>
  );
}

export default App;
