import { useState } from "react";
import FormInput from "./FormInput";
import { bodySchema, Inputs, body } from "param332-common";

import { Link, useNavigate } from "react-router-dom";
import Qute from "../componenet/Qute";
import axios from "axios";
import { BACKEND_URL } from "../Backend_url";

const Signin = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState<body>({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const inputs: Inputs[] = [
    {
      id: 1,
      name: "username",
      placeholder: "username",
      type: "text",
      label: "Username",
    },
    {
      id: 2,
      name: "password",
      placeholder: "password",
      type: "password",
      label: "Password",
    },
    {
      id: 3,
      name: "email",
      placeholder: "email",
      type: "text",
      label: "Email",
    },
    {
      id: 4,
      name: "firstname",
      placeholder: "firstname",
      type: "text",
      label: "Firstname",
    },
    {
      id: 5,
      name: "lastname",
      placeholder: "lastname",
      type: "text",
      label: "Lastname",
    },
  ];

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setFormData({ ...formData, [name]: trimmedValue });
    console.log(formData);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const validationResult = bodySchema.safeParse(formData);
      if (!validationResult.success) {
        const zodError = validationResult.error;
        zodError.errors.forEach((errorMessage: any) => {
          alert(errorMessage.message);
        });
        throw new Error("Zod validation failed");
      }
      const res: any = await axios({
        method: "post",
        url: `${BACKEND_URL}/api/v1/users/signin`,
        data: formData,
      });
      console.log(res + "hi");
      if (res) {
        // Check if response data exists
        console.log(res);
        const JWT = res.data.key;
        localStorage.setItem("JWT Key", JWT);
        console.log("Form submitted with data:", formData);
        Navigate("/");
      } else {
        // Handle case where response is not received
        throw new Error("No response received from server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] laptop:flex-row">
      <div className="flex flex-col  justify-center laptop:justify-start pt-[5vmax] items-center  h-[100%] laptop:w-[55%] w-[100%]">
        <h1 className=" text-black text-[4vmax]">Create an account</h1>
        <h4>
          Already have an account? <Link to="/signup">Signup</Link>
        </h4>
        <form
          className=" mt-[2vmax]   w-[100%] flex flex-col m-3 "
          onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={formData[input.name as keyof typeof formData]}
              onChange={handleInputChange}
              lable={input.label}
            />
          ))}

          <button className="mt-[2vmax] m-5 " type="submit">
            <span className="px-4 py-2 bg-black text-white rounded-md">
              Submit
            </span>
          </button>
        </form>
      </div>

      <Qute />
    </div>
  );
};

export default Signin;
