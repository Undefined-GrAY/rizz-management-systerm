import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    // We explicitly type the variables here
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),

    onSuccess: (user) => {
      // TypeScript knows 'user' is the return from loginApi
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },

    onError: (err: Error) => {
      console.error("ERROR", err.message);
      toast.error("Login failed: " + err.message);
    },
  });

  return { login, isPending };
}
