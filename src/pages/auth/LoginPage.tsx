import { authPaths } from "@/data/routePaths";
import { SignIn } from "@clerk/react";

const LoginPage = () => {
  return (
    <section className="flex items-center justify-center h-screen w-full">
      <SignIn
        forceRedirectUrl="/"
        signUpUrl={authPaths.register}
        oauthFlow="popup"
      />
    </section>
  );
};

export default LoginPage;
