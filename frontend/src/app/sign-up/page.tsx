"use client";

import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Auth from "@/src/app/components/Auth";
import { errorHandler } from "@/src/app/utils/errorHandler";
import { authUrl } from "@/src/app/utils/network";
import { toast } from "react-toastify";

const Signup = () => {
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
      .post(authUrl.register, arg)
      .catch((e: AxiosError) => errorHandler(e));
    SetLoading(false);

    if (response) {
      toast("User created successfully", { type: "success" });
      Router.push("/login");
    }
  };

  return (
    <Auth
      loading={loading}
      onSubmit={onSubmit}
      title="Sign Up"
      buttonTitle="Register"
      accountInfoText={{
        initialText: "Have an Account?",
        actionLink: "/login",
        actionText: "Login",
      }}
    />
  );
};

export default Signup;
