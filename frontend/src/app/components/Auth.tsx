"use client";

import { FC, FormEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import src from "../assets/iphone.png";
import srcLine from "../assets/lines.png";
import { AccessLogo, InputIcon } from "./Icon";
import Input from "./Input";

interface AuthType {
  title?: string;
  buttonTitle?: string;
  // showRemembered?: boolean;
  loading: boolean;
  accountInfoText?: {
    initialText: string;
    actionText: string;
    actionLink: string;
  };
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => void;
}

const Auth: FC<AuthType> = ({
  title = "Log In",
  buttonTitle = "Login",
  accountInfoText,
  loading,
  onSubmit,
}) => {
  const form = useRef<HTMLFormElement>(null);
  return (
    <div className="auth">
      <section className="auth-section grid-cols__3">
        <div className="auth-section__first p-24 flex col-span__2 flex-col bg-home h-screen">
          <div className="logo flex items-center justify-between">
            <div className={`inline-block cursor-pointer`}>
              <AccessLogo />
            </div>
          </div>
          <div className="form-area m-auto w-full max-w-425px">
            <h1 className="mb-2 text-28px">
              Welcome to Access Internet Banking
            </h1>
            <p className="mb-6 text-xs">
              Sign in with your Internet Banking details or Access More login
              details. Not registered on Internet Banking or Access More? Click
              on register to get started
            </p>
            <p className="mb-6 text-xs">
              No account?{" "}
              <Link className="auth-link text-xs font-bold" href="/">
                Open savings account
              </Link>
            </p>
            <form>
              <div className="auth-inputs">
                <div className="input-email">
                  <div className="flex items-center px-3 py-1 rounded-md bg-white">
                    <section className="mr-3">
                      <InputIcon changeIcon />
                    </section>
                    <Input
                      label="Username"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <div className="input-password">
                  <div className="flex items-center px-3 py-1 rounded-md bg-white">
                    <section className="mr-3">
                      <InputIcon />
                    </section>
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>

                  <Link
                    className="text-xs auth-link hover:border-none"
                    href="/"
                  >
                    <span className="mt-2 flex justify-end">
                      {" "}
                      Forgot Username or Password?
                    </span>
                  </Link>
                </div>
              </div>
              <div className="auth-buttons">
                <section className="auth-button__section">
                  <button className="top-button">Sign in</button>
                </section>
                <section className="auth-button__section second">
                  <button className="top-button">
                    Register on internet banking
                  </button>
                </section>
              </div>
            </form>
          </div>
        </div>

        <div className="auth-section__second h-screen">
          <div className="flex w-full items-center justify-center py-10">
            <Image
              width={333}
              height={580}
              src={src}
              alt="banner"
              className=""
            />
          </div>
          <Image src={srcLine} alt="" className="line-image w-full" />
        </div>
      </section>
    </div>
  );
};

export default Auth;
