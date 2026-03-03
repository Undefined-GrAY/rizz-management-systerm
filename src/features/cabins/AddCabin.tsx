import { useForm, FormProvider } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import type { AddCabinFormProps, CabinFormData } from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin as createCabin } from "../../service/apiCabins";

export function AddCabinForm({ onCloseModal }: AddCabinFormProps) {
  const methods = useForm<CabinFormData>({
    defaultValues: {
      name: "",
      maxCapacity: 1,
      regularPrice: 0,
      discount: 0,
      description: "",
    },
  });
  //form setting
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const queryClient = useQueryClient();
  const { isError, isPending, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("success!");
      onCloseModal?.();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });


  const onSubmit = async (data: CabinFormData) => {
    try {
      const sanitizedCabin = {
        ...data,
        // Force lowercase before it hits the DB
        name: data.name.toLowerCase().trim(),
      };
  
      mutate({ ...sanitizedCabin });
    } catch (error) {
      console.error("Failed to create cabin:", error);
    }
  };

  // Shared classes for row styling to match the photo
  const rowClass =
    "lg:grid lg:grid-cols-[16rem_1fr] items-center gap-6 py-1 lg:py-5 md:border-b border-gray-100 dark:border-slate-800 last:border-0";
  const labelClass = "font-medium text-gray-700 dark:text-slate-400 text-sm";
  const inputClass =
    "w-full sm:w-[30rem] md:w-[30rem] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 text-sm transition-all";

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row className={"form-row"}>
          {/* Cabin Name */}
          <Form.Field className={rowClass}>
            <Form.Label
              htmlFor="name"
              required={"This field cannot be empty"}
              className={labelClass}
            >
              Cabin name
            </Form.Label>
            <Form.Input
              name="name"
              placeholder="Luxury Alpine Suite 001"
              disabled={isSubmitting}
              className={inputClass}
              validation={{
                required: "This field is required",
                validate: (value: string) =>
                  value.trim().length > 0 || "Name cannot be just empty spaces",
              }}
            />
          </Form.Field>

          {/* Maximum Capacity */}
          <Form.Field className={rowClass}>
            <Form.Label htmlFor="maxCapacity" required className={labelClass}>
              Maximum capacity
            </Form.Label>
            <Form.Input
              className={inputClass}
              name="maxCapacity"
              type="number"
              min="1"
              placeholder="4"
              disabled={isSubmitting}
            />
          </Form.Field>

          {/* Regular Price */}
          <Form.Field className={rowClass}>
            <Form.Label htmlFor="regularPrice" required className={labelClass}>
              Regular price
            </Form.Label>
            <Form.Input
              className={inputClass}
              name="regularPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="250.00"
              disabled={isSubmitting}
              validation={{
                required: "This field is required",
                validate: (value: string) =>
                  Number(value) >= 0 || "Name cannot be just empty spaces",
              }}
            />
          </Form.Field>

          {/* Discount */}
          <Form.Field className={rowClass}>
            <Form.Label htmlFor="discount" className={labelClass}>
              Discount
            </Form.Label>
            <Form.Input
              className={inputClass}
              name="discount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              disabled={isSubmitting}
            />
          </Form.Field>

          {/* Description */}
          <Form.Field className={rowClass}>
            <Form.Label htmlFor="description" className={labelClass}>
              Cabin description
            </Form.Label>
            <Form.TextArea
              className={inputClass}
              name={"description"}
              rows={4}
              placeholder="Describe this cabin..."
              disabled={isSubmitting}
              validation={{
                required: "This field is required",
                validate: (value: string) =>
                  value.trim().length > 0 || "Name cannot be just empty spaces",
              }}
            />
          </Form.Field>

          {/* Cabin Photo */}
          <Form.Field className={rowClass}>
            <Form.Label htmlFor="image" required className={labelClass}>
              Cabin photo
            </Form.Label>
            <Form.FileInput
              className={inputClass}
              name={"image"}
              accept="image/*"
              disabled={isSubmitting}
              validation={{
                required: "A cabin photo is required",
                validate: (fileList: FileList) => {
                  const file = fileList[0];
                  if (!file) return true; // Handled by 'required'

                  const isLarge = file.size > 5 * 1024 * 1024; // 5MB limit
                  return !isLarge || "Image size must be less than 5MB";
                },
              }}
            />
          </Form.Field>

          {/* Actions */}
          <Form.Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={onCloseModal}
              // disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              size="md"
              type="submit"
              disabled={isSubmitting || isPending}
              icon={
                isSubmitting ? (
                  <Icon name="refresh" className="animate-spin" size={18} />
                ) : (
                  <Icon name="add" size={18} />
                )
              }
            >
              {isSubmitting ? "Creating..." : "Create new cabin"}
            </Button>
          </Form.Actions>
        </Form.Row>
      </Form>
    </FormProvider>
  );
}
