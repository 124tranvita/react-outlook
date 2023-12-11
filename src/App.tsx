import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import "./App.css";
import {
  SignInButton,
  SignOutButton,
  WelcomeUser,
} from "./components/ms-sign-in";
import OutlookCalendar from "./components/outlook-calendar";
function App() {
  // const { accounts } = useMsal();
  // const username = accounts[0].username;

  return (
    <div style={{ width: "1280px" }}>
      <AuthenticatedTemplate>
        <p>This will only render if a user is signed-in.</p>
        <WelcomeUser />
        <SignOutButton />
        <OutlookCalendar />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>This will only render if a user is not signed-in.</p>
        <SignInButton />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
