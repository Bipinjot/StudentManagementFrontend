import React from "react";
import { IoMdSchool } from "react-icons/io";

function Home() {
  return (
    <>
      <div className="flex flex-col w-[1000px] justify-center items-center">
      <h1 className="text-5xl font-bold mb-10 text-slate-500">Student</h1>
      <h1 className="text-5xl font-bold mb-10 text-slate-500">Management</h1>
      <h1 className="text-5xl font-bold mb-10 text-slate-500">System</h1>
      <IoMdSchool className="text-7xl text-slate-800" />
      </div>
    </>
  );
}

export default Home;