import React from "react";
import { Formik, Field, Form } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStudent() {
  const addStudentHandler = async (values) => {
    let studentDetails = {
      firstName: values.firstName,
      familyName: values.familyName,
      emailId: values.email,
      dob: new Date(values.dob).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    };

    console.log(studentDetails);

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDetails), // Replace with your actual data
      });

      if (response.status===201) {
        // Request was successful
        toast.success("Student added successfully")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      else if (response.status===400) {
        // Request was error
        toast.error("Email already exists")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        // Request failed
        console.error("Error:", response.status);
      }
    } catch (error) {
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

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "This is a required field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email id";
    }
    return error;
  };

  const validateAge = (value) => {
    let error;
    const selectedDate = new Date(value);
    const currentDate = new Date();
    const minimumDate = new Date();
    minimumDate.setFullYear(currentDate.getFullYear() - 10);
  
    if (!value) {
      error = "This is a required field";
    } else if (selectedDate >= minimumDate) {
      error = "Age must be greater than 10 years";
    }
  
    return error;
  };

  return (
    <div className="flex w-[1000px] h-[700px] items-center justify-center">
      <Formik
        initialValues={{ firstName: "", familyName: "", dob: "", email: "" }}
        onSubmit={addStudentHandler}
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl font-bold">Add New Student</h1>
              <Field
                className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                validate={validateField}
              />
              {errors.firstName && touched.firstName && (
                <p className="text-red-700">{errors.firstName}</p>
              )}

              <Field
                className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                type="text"
                name="familyName"
                id="familyName"
                placeholder="Enter family name"
                validate={validateField}
              />
              {errors.familyName && touched.familyName && (
                <p className="text-red-700">{errors.familyName}</p>
              )}

              <div className="flex flex-col">
                <p className="text-lg">Select DOB</p>
                <Field
                  className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Select DOB"
                  validate={validateAge}
                />
                {errors.dob && touched.dob && (
                  <p className="text-red-700">{errors.dob}</p>
                )}
              </div>

              <Field
                className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                validate={validateEmail}
              />
              {errors.email && touched.email && (
                <p className="text-red-700">{errors.email}</p>
              )}

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
      <ToastContainer/>
    </div>
  );
}

export default AddStudent;
