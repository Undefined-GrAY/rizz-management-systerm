import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettngs } from "../../service/apiSettings";

export default function useEditSettings() {
    const queryClient = useQueryClient();
    const { isError, isPending, mutate } = useMutation({
      mutationFn: updateSettngs,
      onSuccess: () => {
        toast.success("settings has been successfully updated");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return  { isError, isPending, mutate } ;
}
