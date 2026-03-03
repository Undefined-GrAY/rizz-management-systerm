import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../service/apiAuth";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const role = user?.user_metadata?.role;
  const isAdmin = role === "admin";

  return {
    isPending,
    user,
    isAuthenticated: user?.role === "authenticated",
    isAdmin,
  };
}

