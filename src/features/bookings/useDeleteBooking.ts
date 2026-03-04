import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../service/apiBookings';
import toast from 'react-hot-toast';

const useDeleteBooking = () => {

 const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: (data) => {
      toast.success(`d${data.id} was successfully deleted!`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });  
  return{isPending, mutate}
}

export default useDeleteBooking



