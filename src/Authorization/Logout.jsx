import { useContext } from "react";
import { GeneralContext } from "../App/App";

const Logout = () => {
  const { setUser, user, snackbar, setIsLoader } = useContext(GeneralContext);

  const logout = () => {
    setIsLoader(false);
    fetch(`https://api.shipap.co.il/logout`, {
      credentials: "include",
    }).then(() => {
      setUser(null);
      setIsLoader(false);
      snackbar("user Disconnected successfully");
    });
  };

  return (
    <p className="user">
      {user.fullName} !connected successfully
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </p>
  );
};
export default Logout;
