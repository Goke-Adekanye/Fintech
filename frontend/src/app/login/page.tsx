"use client";

import { FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Auth from "@/src/app/components/Auth";
import { authUrl } from "@/src/app/utils/network";
import useFetchLogic from "../hooks/useFetchLogic";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const Router = useRouter();
  const apiUrl = authUrl.login;

  const { post, loading, response } = useFetchLogic(apiUrl);

  useEffect(() => {
    if (response) Router.push("/");
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
      <Auth loading={loading} onSubmit={onSubmit} />
      <ToastContainer />
    </>
  );
};

export default Login;
