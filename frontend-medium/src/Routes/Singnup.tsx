import { loginSchema, Inputs } from "param332-common";
import React, { useState } from "react";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import Qute from "../componenet/Qute";
import axios from "axios";

import { BACKEND_URL } from "../Backend_url";

const Singnup = () => {
  const Navigate = useNavigate();
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setformData({ ...formData, [name]: trimmedValue });
    console.log(formData);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const validationResult = loginSchema.safeParse(formData);
      if (!validationResult.success) {
        const zodError = validationResult.error;
        zodError.errors.forEach((errorMessage: any) => {
          alert(errorMessage.message);
        });
        throw new Error("Zod validation failed");
      }
      const res: any = await axios({
        method: "post",
        url: `${BACKEND_URL}/api/v1/users/signup`,
        data: formData,
      });

      if (res) {
        // Check if response data exists
        const JWT = res.data.key;
        localStorage.setItem("JWT Key", JWT);

        console.log("Form submitted with data:", formData);
        Navigate("/");
      } else {
        // Handle case where response is not received
        throw new Error("No response received from server");
      }
    } catch (error: any) {
      console.error(error.errorAxiosError);
      if (error.response && error.response.status === 403) {
        alert("User account does not exist");
      } else if (error.response && error.response.status === 400) {
        alert("password did not match");
      }
    }
  };

  const inputs: Inputs[] = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "username or email ",
      label: "Username",
    },
    {
      id: 2,
      name: "password",
      placeholder: "password",
      type: "password",
      label: "Password",
    },
  ];

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] laptop:flex-row">
      <div className="laptop:w-[55%] w-[100%] h-[100%]  flex flex-col justify-center items-center ">
        <form className="w-[100%] flex flex-col" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={formData[input.name as keyof typeof formData]}
              onChange={handleInputChange}
              lable={input.label}
            />
          ))}

          <button className="m-5  " type="submit">
            <span className="bg-black px-4 py-2 rounded-md text-white ">
              Submit
            </span>
          </button>
        </form>
        <h1>
          Do You have an account? <Link to="/signin">Signin</Link>{" "}
        </h1>
      </div>
      <Qute />
    </div>
  );
};

export default Singnup;
