"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Auth from "@/src/app/components/Auth";
import { authUrl } from "@/src/app/utils/network";
import useFetchLogic from "../hooks/useFetchLogic";

const Signup = () => {
  const apiUrl = authUrl.register;
  const Router = useRouter();

  const { post, loading, response } = useFetchLogic(apiUrl);

  const registerSuccess = () =>
    toast("User created successfully", {
      type: "success",
    });

  useEffect(() => {
    if (response) {
      registerSuccess();
      setTimeout(() => {
        Router.push("/login");
      }, 1000);
    }
  }, [Router, response]);

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    let arg = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
    };

    post(arg);
  };

  return (
    <>
      <Auth
        loading={loading}
        onSubmit={onSubmit}
        buttonTitle="Register"
        accountInfoText={{
          actionLink: "/login",
          actionText: "Login internet banking",
        }}
      />
      <ToastContainer />
    </>
  );
};

export default Signup;
