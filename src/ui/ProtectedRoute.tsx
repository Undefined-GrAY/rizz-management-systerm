import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { Spinner } from "./Spinner";

export default function ProtectedRoute() {
  const navigate = useNavigate();

  // This hook calls your getCurrentUser function via React Query
  const { isPending, isAuthenticated } = useUser();

  // 1. Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login", { replace: true });
  }, [isAuthenticated, isPending, navigate]);


  // 2. Show loading while checking the session
  if ( isPending) return <div className="mt-30"><Spinner/> </div>; // Replace with a spinner later

  // 3. Render the child routes (AppLayout -> Dashboard, etc.)
  return isAuthenticated ? <Outlet /> : null;
}
