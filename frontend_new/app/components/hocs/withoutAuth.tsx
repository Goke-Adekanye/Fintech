import { userTokenKey } from "@/utils/contants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withoutAuth = <T extends Object>(
  WrapperComponent: React.ComponentType<T>
) => {
  const WithoutAuth = (props: T) => {
    const [checking, setChecking] = useState(true);
    const Router = useRouter();

    useEffect(() => {
      const userToken = localStorage.getItem(userTokenKey);
      if (userToken) {
        Router.push("/");
      } else {
        setChecking(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (checking) return <h3>LOADING... PLEASE WAIT</h3>;

    return <WrapperComponent {...props} />;
  };

  return WithoutAuth;
};

export default withoutAuth;
