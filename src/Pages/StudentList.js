import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentList() {
  const deleteStudent = async (row) => {
    //console.log(row);
    try {
      const response = await fetch(`http://localhost:8080/users/${row.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status == 200) {
        // Request was successful
        toast.success("Student deleted successfully")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      else if (response.status === 400) {
        // Request was unsuccessful
        toast.error("Student cannot be deleted as student exists in Result")
      }
      else {
        // Request failed
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editStudent = async (row) => {
    console.log(row);
    let studentDetails = {
      id: row.id,
      firstName: "Alex",
      familyName: "Bloos",
      dob: "11/11/2011",
      emailId: "bkhara1@gmail.com",
    };

    console.log(studentDetails);
    try {
      const response = await fetch("http://localhost:8080/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDetails), // Replace with your actual data
      });

      if (response.status === 201) {
        toast.success("Student details updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } 
      else if (response.status===400) {
        // Request was error
        toast.error("Error in updating user")
      }
      else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  let [studentList, setStudentList] = useState([]);
  useEffect(() => {
    //console.log("check");
    axios.get("http://localhost:8080/users").then((res) => {
      const sortedData = res.data.sort((a, b) => {
        const firstNameComparison = a.firstName.localeCompare(b.firstName);
        if (firstNameComparison !== 0) {
          return firstNameComparison;
        }
        // Sort by familyName if firstName is equal
        return a.familyName.localeCompare(b.familyName);
      });
      console.log(sortedData);
      setStudentList(sortedData);
    });
  }, []);
  const columns = [
    {
      Header: "Full Name",
      accessor: (row) => `${row.shyft_name} ${row.shyft_familyname}`,
    },
    { Header: "DOB", accessor: "shyft_dob" },
    { Header: "Email", accessor: "shyft_email" },
  ];
  return (
    <>
      <div className="flex flex-col w-[1000px] justify-center items-center">
        <h1 className="text-2xl font-bold mb-10">Student List</h1>
        {studentList.length > 0 ? (
          <div className="flex flex-row justify center items center">
            <table className="border-2 border-slate-200">
              <tr className="border-2 border-slate-200">
                <th className="w-[400px] justify-center items-center">
                  Full Name
                </th>
                <th className="w-[100px] justify-center items-center">DOB</th>
                <th className="w-[200px] justify-center items-center">Email</th>
                <th className="w-[50px] justify-center items-center">Action</th>
              </tr>
              <tbody>
                {studentList.map((row, index) => (
                  <tr
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    key={index}
                  >
                    <td className="w-[400px] justify-center items-center p-2">
                      {row.firstName} {row.familyName}
                    </td>
                    <td className="w-[200px] justify-center items-center p-2">
                      {row.dob}
                    </td>
                    <td className="w-[200px] justify-center items-center p-2">
                      {row.emailId}
                    </td>
                    <td
                      className="w-[50px] justify-center items-center p-2"
                      onClick={() => {
                        editStudent(row);
                      }}
                    >
                      <button className="bg-blue-500 rounded-full text-neutral-100 font-bold py-2 px-3 rounded-full">
                      <AiFillEdit className="text-2xl text-neutral-100"/>
                      </button>
                    </td>
                    <td
                      className="w-[50px] justify-center items-center p-2"
                      onClick={() => {
                        deleteStudent(row);
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
      <ToastContainer />
    </>
  );
}
export default StudentList;
