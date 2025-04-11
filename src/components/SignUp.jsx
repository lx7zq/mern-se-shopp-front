import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import SocialLogin from "./SocialLogin";
import UserService from "../services/user.service";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        //Sign up to loacl backend
        await UserService.addUser(user.email);
        Swal.fire({
          icon: "success",
          title: "Register Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="modal-action mt-0 flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg">Please Login</h3>
        <form method="card-body " onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </label>
          </div>
          <div className="form-control">
            {" "}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </label>
            <label className="label">
              <a className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value={"Sign Up"}
              className="btn bg-red ml-1 text-white"
            />
          </div>
          <p className="text-center my-2">
            Have an account?
            <a href="/signin" className="underline text-md ml-1">
              Sign In Now
            </a>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default SignUp;
