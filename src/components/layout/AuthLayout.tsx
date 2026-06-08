import { Navigate } from "react-router";
import { useAuth } from "@clerk/react";
import { authPaths } from "@/data/routePaths";
import { Spinner } from "../ui/spinner";
import PublicLayout from "./PublicLayout";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={authPaths.login} replace />;
  }

  return <PublicLayout />;
};

export default AuthLayout;
