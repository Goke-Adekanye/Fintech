'use client'

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

const Auth: FC<AuthType> = ({ title = "Log In",
    buttonTitle = "Login",
    accountInfoText,
    loading,
    onSubmit }) => {

    return (
        <p>Hi</p>
    )

}

export default Auth