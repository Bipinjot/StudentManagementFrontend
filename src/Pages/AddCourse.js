import React from "react";
import { Formik, Field, Form } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCourse() {
  const addCourseHandler = async (values) => {
    let courseDetails = {
      courseName: values.courseName
    };
    console.log(courseDetails);
    try {
      const response = await fetch("http://localhost:8080/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseDetails), 
      });

      if (response.status===201) {
        // Request was successful
        toast.success("Course added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } 
      else if (response.status === 400) {
        // Request was unsuccessful
        toast.error("Error in adding the course")
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      else {
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

  return (
    <div className="flex w-[1000px] h-[700px] items-center justify-center">
      <Formik initialValues={{ courseName: "" }} onSubmit={addCourseHandler}>
        {({ errors, touched, isValidating }) => (
          <Form>
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl font-bold">Add New Course</h1>
              <Field
                className="w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                type="text"
                name="courseName"
                id="courseName"
                placeholder="Enter course name"
                validate={validateField}
              />
              {errors.courseName && touched.courseName && (
                <p className="text-red-700">{errors.courseName}</p>
              )}

              {/* <label htmlFor="courseType" className="mb-2">
                Type of Course
              </label>
              <div className="flex flex-col">
                <label>
                  <Field
                    className="w-[50px] h-5 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                    type="radio"
                    name="courseType"
                    id="courseType"
                    value="option1"
                    validate={validateField}
                  />
                  Mandatory
                </label>
                <label>
                  <Field
                    className="w-[50px] h-5 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2"
                    type="radio"
                    name="courseType"
                    id="courseType"
                    value="option2"
                    validate={validateField}
                  />
                  Optional
                </label>
                {errors.courseType && touched.courseType && (
                  <p className="text-red-700">{errors.courseType}</p>
                )}
              </div> */}

              {/* <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="isCourseTypeSelected"
                  validate={validateField}
                />
                <label htmlFor="isCourseTypeSelected" className="ml-2">
                  Course Type
                </label>
              </div>
              {errors.isCourseTypeSelected && touched.isCourseTypeSelected && (
                  <p className="text-red-700">{errors.isCourseTypeSelected}</p>
                )} */}

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
}

export default AddCourse;
