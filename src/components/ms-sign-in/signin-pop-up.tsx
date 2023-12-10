import { FC, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

const SignInButton: FC = () => {
  const { instance } = useMsal();

  const signInClickHandler = useCallback(
    (instance: IPublicClientApplication) => {
      instance.loginRedirect();
    },
    []
  );

  return <button onClick={() => signInClickHandler(instance)}>Sign In</button>;
};

export default SignInButton;
