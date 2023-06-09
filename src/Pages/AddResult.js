import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddResult()
{
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);

  // Function to fetch options for dropdown 1
  const fetchOptions1 = () => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        setOptions1(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to fetch options for dropdown 2
  const fetchOptions2 = () => {
    fetch("http://localhost:8080/courses")
      .then((response) => response.json())
      .then((data) => {
        setOptions2(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(options1);
  console.log(options2);
  // Call fetchOptions1 and fetchOptions2 when the component mounts
  useEffect(() => {
    fetchOptions1();
    fetchOptions2();
  }, []);

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    // Perform validation
    if (!values.dropdown1 || !values.dropdown2 || !values.score) {
      alert("Please select options for all dropdowns."); // You can use other form validation techniques as well
      setSubmitting(false);
      return;
    }

    // Prepare the data for the POST request
    const data = {
      grade: values.score,
      user: {
        id: values.dropdown1
      },
      course: {
        id: values.dropdown2
      }
    };
    console.log(values);
    console.log(data);

    // Send the POST request
    try{
      const response =await fetch("http://localhost:8080/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status===201) {
      // Request was successful
      toast.success("Result added successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } 
    else if (response.status === 400) {
      // Request was unsuccessful
      toast.error("Error in adding a new result")
    }
    else {
      // Request failed
      console.error("Error:", response.status);
    }
  }
    catch (error) {
      console.error("Error:", error);
    }
  };

  const validateField = (values) => {
    let error;
    if (!values) {
      error = "This is a required field";
    }
    return error;
  };

  return (
    <div className="flex w-[1000px] h-[700px] items-center justify-center">
      <Formik
        initialValues={{ dropdown1: "", dropdown2: "" }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="flex flex-col items-center p-4">
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl font-bold">Add New Student</h1>
              <div className="flex flex-col">
                <label htmlFor="dropdown1" className="mb-2">
                  Student Name
                </label>
                <Field
                  as="select"
                  id="dropdown1"
                  name="dropdown1"
                  className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                  validate={validateField}
                >
                  <option value="">Select...</option>
                  {options1.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.firstName + " "+ option.familyName}
                    </option>
                  ))}
                </Field>
                {errors.dropdown1 && touched.dropdown1 && (
                  <p className="text-red-700">{errors.dropdown1}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="dropdown2" className="mb-2">
                  Course Name
                </label>
                <Field
                  as="select"
                  id="dropdown2"
                  name="dropdown2"
                  validate={validateField}
                  className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                >
                  <option value="">Select...</option>
                  {options2.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.courseName}
                    </option>
                  ))}
                </Field>
                {errors.dropdown2 && touched.dropdown2 && (
                  <p className="text-red-700">{errors.dropdown2}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="score" className="mb-2">
                  Score
                </label>
                <Field
                  as="select"
                  id="score"
                  name="score"
                  validate={validateField}
                  className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                >
                  <option value="">Select...</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </Field>
                {errors.score && touched.score && (
                  <p className="text-red-700">{errors.score}</p>
                )}
              </div>
              <button
                type="submit"
                className="flex p-4 justify-center items-center bg-green-600 shadow-md rounded-md uppercase font-bold text-2xl text-neutral-100 mt-20"
              >
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddResult;
