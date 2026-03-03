import { useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../service/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("user profile uodated.");
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  return { updateUser, isPending };
}
