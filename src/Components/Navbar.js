import React from "react";
import { IoMdSchool } from "react-icons/io";

function Navbar() {
  return (
    <div className="flex fixed h-full bg-slate-600 w-100 p-8">
      <nav className="flex flex-col gap-4 space-y-2 w-80 p-2">
        <ul className="flex flex-col gap-4 space-y-2 w-80 p-2">
          <li className="flex flex-row space-x-2">
            <p className="font-bold text-4xl text-neutral-100 tracking-widest">
              SMS<a></a>
            </p>
            <IoMdSchool className="text-4xl text-neutral-100"/>
          </li>
          <li>
            <p>
              <a href="/home">Home</a>
            </p>
          </li>
          <li>
            <p>
              <a href='/addStudent'>Add Student</a>
            </p>
          </li>
          <li>
            <p>
              <a href='/studentList'>Student List</a>
            </p>
          </li>
          <li>
            <p>
              <a href='/addCourse'>Add Course</a>
            </p>
          </li>
          <li>
            <p>
              <a href='/courseList'>Course List</a>
            </p>
          </li>
          <li>
            <p>
              <a href='/addResult'>Add Result</a>
            </p>
          </li>
          <li>
            <p>
              <a href='/results'>Results</a>
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
