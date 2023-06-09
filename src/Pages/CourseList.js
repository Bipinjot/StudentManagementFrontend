import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CourseList() {
  const deleteCourse = async (row) => {
    console.log(row);
    try {
      const response = await fetch(`http://localhost:8080/courses/${row.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200) {
        console.log("Deleted successfully")
        // Request was successful
        toast.success("Course deleted successfully")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      else if (response.status === 400) {
        // Request was unsuccessful
        toast.error("Course cannot be deleted as course exists in Result")
      }
      else {
        // Request failed
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  let [courseList, setCourseList] = useState([]);
  useEffect(() => {
    //console.log("check");
    axios.get("http://localhost:8080/courses").then((res) => {
      console.log(res.data);
      setCourseList(res.data);
    });
  }, []);
  const columns = [
    {
      Header: "Course Name",
      accessor: "shyft_coursename",
    },
  ];
  return (
    <>
      <div className="flex flex-col w-[1000px] justify-center items-center">
        <h1 className="text-2xl font-bold mb-10">Course List</h1>
        {courseList.length > 0 ? (
          <div className="flex flex-row justify center items center">
            <table className="border-2 border-slate-200">
              <tr className="border-2 border-slate-200">
                <th className="w-[400px] justify-center items-center">
                  Course Name
                </th>
                <th className="w-[50px] justify-center items-center">Action</th>
              </tr>
              <tbody>
                {courseList.map((row, index) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                    key={index}
                  >
                    <td className="w-[400px] justify-center items-center p-2">
                      {row.courseName}
                    </td>
                    <td
                      className="w-[50px] justify-center items-center p-2"
                      onClick={() => {
                        deleteCourse(row);
                      }}
                    >
                      <button className="bg-red-500 rounded-full text-neutral-100 font-bold py-2 px-4 rounded-full">
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
      <ToastContainer/>
    </>
  );
}

export default CourseList;
