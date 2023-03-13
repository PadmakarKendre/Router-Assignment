import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import DashboardChild from "./dashboard-child";

const Auth = ({ role }) => {
  return role === "admin" ? (
    <Suspense fallback={<>...</>}>
      <DashboardChild title="analisys" />
    </Suspense>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
export default Auth;
