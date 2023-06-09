import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Results() {
  const deleteResult = async (row) => {
    //console.log(row);
    try {
      const response = await fetch(`http://localhost:8080/results/${row.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200) {
        // Request was successful
        toast.success("Result deleted successfully")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      else if (response.status === 204) {
        // Request was unsuccessful
        toast.error("No result Found")
      }
      else if (response.status === 400) {
        // Request was unsuccessful
        toast.error("Error in deleting result")
      }
      else {
        // Request failed
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editResult = async (row) => {
    console.log(row);
    let resultDetails = {
      id: row.id,
      grade: "C",
      user: {
        id: row.user.id
      },
      course: {
        id: row.course.id
      }
    };

    console.log(resultDetails);
    try {
      const response = await fetch("http://localhost:8080/results/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultDetails), // Replace with your actual data
      });

      if (response.status === 200) {
        toast.success("Result details updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } 
      else if (response.status===400) {
        // Request was error
        toast.error("Error in updating result")
      }
      else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let [resultList, setResultList] = useState([]);
  useEffect(() => {
    //console.log("check");
    axios
      .get("http://localhost:8080/results")
      .then((res) => {
        const sortedData = res.data.sort((a, b) => {
          const courseNameComparison = a.course.courseName.localeCompare(b.course.courseName);
          if (courseNameComparison !== 0) {
            return courseNameComparison; // Sort by firstName if not equal
          }
          // Sort by Grades
          const gradeComparison = a.grade.localeCompare(b.grade);
          if (gradeComparison !== 0) {
            return gradeComparison; // Sort by firstName if not equal
          }
          // Sort by First Name
          const firstNameComparison = a.user.firstName.localeCompare(b.user.firstName);
          if (firstNameComparison !== 0) {
            return firstNameComparison;
          }
          // Sort by familyName if firstName is equal
          return a.user.familyName.localeCompare(b.user.familyName);
        });
        console.log(res.data);
        setResultList(sortedData);
      });
  }, []);

  const columns = [
    { Header: "Course Name", accessor: "shyft_resultcourse" },
    { Header: "Student Name", accessor: "shyft_resultuser" },
    { Header: "Score", accessor: "shyft_resultscore" },
  ];
  return (
    <>
      <div className="flex flex-col w-[1000px] justify-center items-center">
        <h1 className="text-2xl font-bold mb-10">Result List</h1>
        {resultList.length > 0 ? (
          <div className="flex flex-row justify center items center">
            <table className='border-2 border-slate-200'>
              <tr className='border-2 border-slate-200'>
                <th className="w-[200px] justify-center items-center">Course</th>
                <th className="w-[400px] justify-center items-center">Student</th>
                <th className="w-[100px] justify-center items-center">Score</th>
                <th className="w-[50px] justify-center items-center">Action</th>
              </tr>
              <tbody>
                {resultList.map((row, index) => (

                  <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={index}>
                    <td className="w-[200px] justify-center items-center p-2">
                      {row.course.courseName}
                    </td>
                    <td className="w-[400px] justify-center items-center p-2">{row.user.firstName} {row.user.familyName}</td>
                    <td className="w-[100px] justify-center items-center p-2">{row.grade}</td>
                    <td
                      className="w-[50px] justify-center items-center p-2"
                      onClick={() => {
                        editResult(row);
                      }}
                    >
                      <button className="bg-blue-500 rounded-full text-neutral-100 font-bold py-2 px-3 rounded-full">
                      <AiFillEdit className="text-2xl text-neutral-100"/>
                      </button>
                    </td>
                    <td className="w-[50px] justify-center items-center p-2"
                      onClick={() => {
                        deleteResult(row);
                      }}
                    >
                      <button className="bg-red-500 rounded-full text-neutral-100 font-bold py-2 px-4 rounded-full">X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </>
  )
}

export default Results