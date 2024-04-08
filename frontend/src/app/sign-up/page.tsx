"use client";

import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Auth from "@/src/app/components/Auth";
import { errorHandler } from "@/src/app/utils/errorHandler";
import { authUrl } from "@/src/app/utils/network";

const Signup = () => {
  const [loading, SetLoading] = useState(false);
  const Router = useRouter();

  const registerSuccess = () =>
    toast("User created successfully", {
      type: "success",
    });

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    SetLoading(true);
    let arg = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
    };

    const response = await axios
      .post(authUrl.register, arg)
      .catch((e) => errorHandler(e.response?.data));
    SetLoading(false);

    if (response?.data) {
      registerSuccess();
      Router.push("/login");
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
      />
      <ToastContainer />
    </>
  );
};

export default Signup;
