"use client";

import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Auth from "@/src/app/components/Auth";
import { errorHandler } from "@/src/app/utils/errorHandler";
import { authUrl } from "@/src/app/utils/network";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, SetLoading] = useState(false);
  const Router = useRouter();

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
      .post(authUrl.login, arg)
      .catch((e: AxiosError) => errorHandler(e));
    SetLoading(false);

    if (response && response.data && response.data.token) {
      toast("User created successfully", {
        type: "success",
      });
      // Router.push("/");
      console.log(response);
    }
  };

  return <Auth loading={loading} onSubmit={onSubmit} />;
};

export default Login;
