import { FC } from "react";
import { useMsal } from "@azure/msal-react";

const WelcomeUser: FC = () => {
  const { accounts } = useMsal();
  const username = accounts[0].username;

  console.log({ username, accounts });

  return <p>Welcome, {username}</p>;
};

export default WelcomeUser;
