import { GuestDashboard } from "./GuestDashboard";
import { UserDashboard } from "./UserDashboad";

export function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserDashboard />;
    }
    return <GuestDashboard />;
  }
export function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
  }
  
export function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }