import { useForm, FormProvider } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import { useUser } from "../authentication/useUser";

export default function UpdatePassword() {
  const { user, isAdmin } = useUser();

  const methods = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    // Validate passwords match
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    // Validate minimum length
    if (data.newPassword.length < 8) {
      setError("newPassword", {
        type: "manual",
        message: "Password must be at least 8 characters",
      });
      return;
    }

    try {

      // onUpdate?.();
      reset();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Failed to update password. Please try again.",
      });
    }
  };

  const fieldClass =
    "lg:grid lg:grid-cols-[16rem_1fr] lg:items-center gap-y-2 gap-x-6 py-3 md:py-5 border-b border-gray-100 dark:border-slate-800 last:border-b";
  return (
    <div className="bg-white dark:bg-slate-900 md:rounded-xl md:border border-slate-200 dark:border-slate-800 shadow-sm p-4 md:p-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Update password
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Ensure your account is using a secure, random password.
        </p>
      </div>

      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            {/* General Error */}
            <Form.Error message={errors.root?.message} />

            {/* New Password */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="newPassword" required>
                New password
              </Form.Label>
              <Form.Password
                name="newPassword"
                placeholder="Min 8 characters"
                disabled={isSubmitting}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Must be at least 8 characters long
              </p>
            </Form.Field>

            {/* Confirm Password */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="confirmPassword" required>
                Confirm password
              </Form.Label>
              <Form.Password
                name="confirmPassword"
                placeholder="Repeat new password"
                disabled={isSubmitting}
              />
            </Form.Field>

            {/* Actions */}
            <Form.Actions className="pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isAdmin}
                icon={
                  isSubmitting ? (
                    <Icon name="refresh" className="animate-spin" size={18} />
                  ) : null
                }
              >
                {isSubmitting ? "Updating..." : "Update password"}
              </Button>
            </Form.Actions>
          </Form.Row>
        </Form>
      </FormProvider>
    </div>
  );
}
