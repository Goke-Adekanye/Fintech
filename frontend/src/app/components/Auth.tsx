"use client";

import Link from "next/link";
import { FC, FormEvent, useRef } from "react";

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
            <div className="inline-block cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="107"
                height="26"
                fill="none"
              >
                <path
                  fill="#004185"
                  d="M38.983 19.37c-1.913.426-5.788 1.042-5.357-1.753.335-2.083 3.683-2.083 5.835-1.8l-.478 3.553Zm-7.031-7.72c2.774-.615 7.844-2.273 7.796 1.895-2.44.047-4.257-.284-6.553.52-5.883 2.132-4.113 10.325 6.266 7.862 3.205-.758 2.631-.947 3.11-4.073.573-3.646 1.865-8.24-3.253-9.471-1.435-.332-5.07-.143-6.457.331l-.91 2.936Zm47.975 2.274-6.266.047c.43-3.836 6.888-5.02 6.266-.047Zm1.292 5.02c-1.818.331-3.253 1.041-5.31.71-1.817-.332-2.87-1.279-2.726-3.363h9.758c.287-2.888.813-7.198-4.066-7.956-8.85-1.326-12.197 9.803-6.553 13.119 2.248 1.326 7.51.947 8.084.047.19-.237.717-2.131.813-2.558Zm14.206-.142-.766 2.604c3.3 1.895 12.915.995 10.858-4.641-.382-1.042-1.196-1.658-2.152-2.226-.622-.379-2.392-1.184-2.774-1.61-1.148-1.373.813-3.22 5.452-1.373.287-.38.335-.71.527-1.232.191-.52.287-.805.43-1.326-2.487-.568-4.879-1.231-7.557-.237-2.01.758-5.453 4.31.19 7.341.862.474 2.345.994 2.297 2.084-.048 1.231-1.626 1.468-2.918 1.42-1.674 0-2.2-.426-3.587-.805Zm-.383-9.851c-2.487-.474-5.07-1.279-7.7-.142-1.101.473-1.819.994-2.297 2.084-2.104 4.877 5.31 5.162 4.975 7.387-.192 1.137-1.722 1.374-3.014 1.327-1.483-.048-2.152-.38-3.396-.805-.382.473-.765 1.846-.813 2.604 1.722.995 5.788 1.137 7.797.474 1.96-.663 4.209-2.7 2.917-5.4-.956-1.94-4.448-2.699-4.974-3.788-.718-1.42 1.004-1.894 2.104-1.941 1.531-.048 2.344.378 3.588.805l.813-2.605Zm-37.644.047c-2.726-.71-5.405-1.184-8.179-.047-4.879 1.941-6.314 9.045-2.344 12.076 1.961 1.468 5.023 1.468 7.893.995l1.004-2.984c-1.913.427-3.683.947-5.5-.142-2.87-1.752-2.2-6.346 1.147-7.577 2.2-.805 3.253-.142 5.118.284l.861-2.605Zm10.906 10.088c-2.009.379-3.54.9-5.405-.095-2.726-1.468-2.487-6.204 1.052-7.625 2.2-.9 3.253-.047 5.118.237l.91-2.557c-2.87-.758-6.123-1.28-8.802.189-5.74 3.126-6.505 14.255 4.927 12.976 1.243-.142 1.195 0 1.53-1.042.24-.71.526-1.373.67-2.083Z"
                ></path>
                <path
                  fill="#FF8200"
                  d="M10.714 2.084 22.577 13.78 12.34 23.916 2.105 13.781l4.926-5.02H5.022L0 13.781 12.34 26l12.293-12.219L10.763 0l-.049 2.084Z"
                ></path>
                <path
                  fill="#FF8200"
                  d="M10.762 8.809 8.61 8.76l-4.927 5.02 8.658 8.572 8.657-8.572L10.762 3.6l-.048 1.99 8.275 8.192-6.648 6.583-6.601-6.583 5.022-4.972Z"
                ></path>
                <path
                  fill="#FF8200"
                  d="m12.293 10.845 3.013 2.936-3.013 2.937-3.014-2.937 3.014-2.936Zm5.07 2.936-5.07-5.02-5.07 5.02 5.07 5.02 5.07-5.02Z"
                ></path>
              </svg>
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
              <Link className="auth-link text-xs font-bold" href="/sign-up">
                Open savings account
              </Link>
            </p>
            <form>
              <div className="auth-inputs">
                <div>
                  <div className="flex items-center px-3 py-1 rounded-md bg-white">
                    <section className="mr-3">
                      <svg
                        width="16"
                        height="19"
                        viewBox="0 0 16 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="4"
                          cy="4"
                          r="4"
                          transform="matrix(-1 0 0 1 12 1)"
                          stroke="#B1B1B1"
                          stroke-width="1.5"
                        ></circle>
                        <path
                          d="M1 14.9347C1 14.0743 1.54085 13.3068 2.35109 13.0175V13.0175C6.00404 11.7128 9.99596 11.7128 13.6489 13.0175V13.0175C14.4591 13.3068 15 14.0743 15 14.9347V16.2502C15 17.4376 13.9483 18.3498 12.7728 18.1818L11.8184 18.0455C9.28565 17.6837 6.71435 17.6837 4.18162 18.0455L3.22721 18.1818C2.0517 18.3498 1 17.4376 1 16.2502V14.9347Z"
                          stroke="#B1B1B1"
                          stroke-width="1.5"
                        ></path>
                      </svg>
                    </section>
                    <div className="input-div relative w-full">
                      <input
                        className="peer block w-full rounded-t-lg border-0 bg-inherit px-25 pb-25 pt-5 text-sm text-gray-900"
                        name="email"
                      />
                      <label className="">Username</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
