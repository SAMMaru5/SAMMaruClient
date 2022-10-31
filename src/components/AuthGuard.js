import { checkExpiredAccesstoken, signout } from "../hooks/useAuth";

function AuthGuard({ children }) {
  checkExpiredAccesstoken((response) => {
    !response && signout();
  });
  return children;
}

export default AuthGuard;
