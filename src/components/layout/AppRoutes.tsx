import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/HomePage";
import { Route, Routes } from "react-router";
import PublicLayout from "./PublicLayout";
import AuthLayout from "./AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* protected routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
