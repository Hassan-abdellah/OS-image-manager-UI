import { authPaths } from "@/data/routePaths";
import { SignUp } from "@clerk/react";

const RegisterPage = () => {
  return (
    <section className="flex items-center justify-center h-screen w-full">
      <SignUp
        forceRedirectUrl="/"
        signInUrl={authPaths.login}
        oauthFlow="popup"
      />
    </section>
  );
};

export default RegisterPage;
