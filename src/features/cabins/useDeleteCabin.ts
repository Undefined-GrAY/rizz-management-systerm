import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../service/apiCabins';
import toast from 'react-hot-toast';

export default function useDeleteCabin() {
   const queryClient = useQueryClient();
   const { isPending, mutate } = useMutation({
     mutationFn: (id: number) => deleteCabin(id),
      onSuccess: (data) => {
       toast.success(`d${data.id} was successfully delted!`);
       queryClient.invalidateQueries({
         queryKey: ["cabins"],
       });
     },
     onError: (err) => toast.error(err.message),
   });

   return { isPending, mutate };
}
