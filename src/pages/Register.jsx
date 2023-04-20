import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = Yup.object().shape({
    store_name: Yup.string().required("This field is required"),
    username: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Wrong email format")
      .required("This field is required"),
    phone_number: Yup.string()
      .min(10, "Must be more than 10 characters")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password too short"),
  });

  const registerUser = async (value, actions) => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        "http://localhost:8001/auth/register",
        value
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        footer: "",
      });

      setIsLoading(false);
      actions.resetForm({
        store_name: "",
        username: "",
        email: "",
        phone_number: "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data?.message || "Something went wrong!!",
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          store_name: "",
          username: "",
          email: "",
          phone_number: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(value, actions) => {
          registerUser(value, actions);
          console.log(actions);
        }}
      >
        {(props) => {
          return (
            <>
              <div className="flex h-screen items-start justify-center px-4 py-8 sm:px-6 lg:px-8 bg-blue-900">
                <div className="w-full h-2/3 max-w-lg py-11 px-14 bg-slate-50 rounded-md box-shadow-register">
                  <div className="flex gap-2 items-end justify-center">
                    <p className="text-center text-2xl text-blue-900">
                      Sign up to
                    </p>
                    <p className="text-center text-4xl font-bold text-blue-900 tracking-tighter">
                      Cashier App
                    </p>
                  </div>
                  <Form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm">
                      <div className="my-4">
                        <label htmlFor="store_name" className="sr-only">
                          Store Name
                        </label>
                        <Field
                          id="store_name"
                          name="store_name"
                          type="text"
                          required
                          className="pl-4 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                          placeholder="Store name"
                        />
                        <ErrorMessage
                          component="div"
                          name="store_name"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="username" className="sr-only">
                          Username
                        </label>
                        <Field
                          id="username"
                          name="username"
                          type="text"
                          required
                          className="pl-4 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                          placeholder="Username"
                          autoComplete="username"
                        />
                        <ErrorMessage
                          component="div"
                          name="username"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="my-4">
                        <label
                          htmlFor="email-address"
                          className="sr-only block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email address
                        </label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="pl-4 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                          placeholder="Email"
                        />

                        <ErrorMessage
                          component="div"
                          name="email"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="phone_number" className="sr-only">
                          Phone number
                        </label>
                        <Field
                          id="phone_number"
                          name="phone_number"
                          type="text"
                          required
                          className="pl-4 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                          placeholder="Phone number"
                        />
                        <ErrorMessage
                          component="div"
                          name="phone_number"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="my-4">
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          required
                          className="pl-4 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="pb-9">
                        <button
                          disabled
                          type="button"
                          className="group relative flex w-full justify-center rounded-md bg-blue-900 px-3 py-2 text-lg font-semibold text-white items-center"
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Loading...
                        </button>
                        <div className="flex gap-2 items-end justify-end py-1">
                          <p className="text-blue-900 text-end text-xs my-2 ">
                            Already have an account?
                          </p>

                          <p className="text-blue-900 text-end font-bold text-sm my-2 hover:text-blue-600">
                            Log in
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md bg-blue-900 px-3 py-2 text-lg font-semibold text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          Sign up
                        </button>

                        <div className="flex gap-2 items-end justify-end py-1">
                          <p className="text-blue-900 text-end text-xs my-2 ">
                            Already have an account?
                          </p>
                          <Link to={"/login"}>
                            <p className="text-blue-900 text-end font-bold text-sm my-2 hover:text-blue-600">
                              Log in
                            </p>
                          </Link>
                        </div>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
