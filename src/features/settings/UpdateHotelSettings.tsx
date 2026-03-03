import { useForm, FormProvider } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import type { SettingsType, UpdateHotelSettingsProps } from "../../types/types";
import useEditSettings from "./useEditSettings";


export function UpdateHotelSettings({ settings }: UpdateHotelSettingsProps) {
  const methods = useForm<SettingsType>({
    defaultValues: settings || {
      minBookingLength: 5,
      maxBookingLength: 90,
      maxGuestsPerBooking: 8,
      breakfastPrice: 15,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const { isError, isPending, mutate: editSettings } = useEditSettings();

  const onSubmit = async (data: SettingsType) => {
    try {
      // Simulate API call

      const verifyData = {
        ...data,
        breakfastPrice: Number(data.breakfastPrice),
      };


      editSettings(verifyData);
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  const fieldClass =
    "lg:grid lg:grid-cols-[16rem_1fr] items-center gap-x-6 gap-y-2 py-3 md:py-5 border-b border-gray-100 dark:border-slate-800 last:border-0";
  return (
    <div className="bg-white dark:bg-slate-900 md:rounded-xl md:border border-slate-200 dark:border-slate-800 shadow-xs p-4 md:p-8">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row className="form-row">
            {/* Minimum Nights */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="minBookingLength" required>
                Minimum nights/booking
              </Form.Label>
              <Form.Input
                name="minBookingLength"
                type="number"
                min="1"
                placeholder="5"
                disabled={isSubmitting}
              />
              <p className="text-xs text-slate-500 grid-rows- dark:text-slate-400 mt-1 lg:row-start-1 lg:col-span-2">
                Minimum number of nights guests can book
              </p>
            </Form.Field>

            {/* Maximum Nights */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="maxBookingLength" required>
                Maximum nights/booking
              </Form.Label>
              <Form.Input
                name="maxBookingLength"
                type="number"
                min="1"
                placeholder="90"
                disabled={isSubmitting}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 lg:row-start-1 lg:col-span-2">
                Maximum number of nights guests can book
              </p>
            </Form.Field>

            {/* Maximum Guests */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="maxGuestsPerBooking" required>
                Maximum guests/booking
              </Form.Label>
              <Form.Input
                name="maxGuestsPerBooking"
                type="number"
                min="1"
                placeholder="8"
                disabled={isSubmitting}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 lg:row-start-1 lg:col-span-2">
                Maximum number of guests per booking
              </p>
            </Form.Field>

            {/* Breakfast Price */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="breakfastPrice" required>
                Breakfast price
              </Form.Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                  $
                </span>
                <Form.Input
                  name="breakfastPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="15"
                  disabled={isSubmitting}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 lg:row-start-1 lg:col-span-2">
                Price per person per night
              </p>
            </Form.Field>

            {/* Actions */}
            <Form.Actions className="pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => methods.reset()}
                disabled={isSubmitting || !isDirty || isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isDirty || isPending}
                icon={
                  isSubmitting ? (
                    <Icon name="refresh" className="animate-spin" size={18} />
                  ) : (
                    <Icon name="settings" size={18} />
                  )
                }
              >
                {isSubmitting ? "Updating..." : "Update settings"}
              </Button>
            </Form.Actions>
          </Form.Row>
        </Form>
      </FormProvider>
    </div>
  );
}
