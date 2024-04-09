"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Auth from "@/src/app/components/Auth";
import { authUrl } from "@/src/app/utils/network";
import useFetchLogic from "../hooks/useFetchLogic";

const Signup = () => {
  const [emailInput, setEmailInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const apiUrl = authUrl.register;
  const Router = useRouter();

  const { post, loading, response } = useFetchLogic(apiUrl);

  const registerSuccess = () =>
    toast("User created successfully", {
      type: "success",
    });

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    let arg = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
    };

    if (arg.email) setEmailInput(true);
    if (arg.password) setPasswordInput(true);
    post(arg);

    if (response) {
      console.log(response);
      registerSuccess();
      // Router.push("/login");
    }
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
        emailInput={emailInput}
        passwordInput={passwordInput}
      />
      <ToastContainer />
    </>
  );
};

export default Signup;
