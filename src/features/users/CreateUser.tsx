import { useForm, FormProvider } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import { useSignup } from "../authentication/useSignUp";
import { useUser } from "../authentication/useUser";

export default function CreateUser({ onCancel, onSuccess }) {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: false,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = methods;
  // const password = watch('password');

  // const confirmPassword = watch("confirmPassword");
  // const invalidPassword = password !==confirmPassword;
  // Check if password === confirmPassword

  const { signup, isPending } = useSignup();
    const { isAdmin} = useUser();
    
  const onSubmit = async (data) => {
    // Validate password match

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    if (data.fullName.trim() === "") {
      setError("fullName", {
        type: "manual",
        message: "name required",
      });
      return;
    }

    const newData = {
      email: data.email.toLowerCase(),
      fullName: data.fullName.toLowerCase(),
      password: data.password,
      role: data.role ? "admin" : "staff",
    };
 

    try {
      //user data
      signup(newData);
      // Call success callback
      onSuccess?.();

      // Reset form
      methods.reset();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Failed to create user. Please try again.",
      });
    }
  };

  const fieldClass =
    "lg:grid lg:grid-cols-[16rem_1fr] lg:items-center gap-6 py-3 md:py-5 border-b border-gray-100 dark:border-slate-800 last:border-b";
  return (
    <div className="max-w-4xl mx-auto ">
      {/* Header */}

      {/* Form Card shadow-sm*/}
      <div className="bg-white dark:bg-slate-900 md:rounded-xl md:border border-slate-200 dark:border-slate-800 p-4 md:p-8">
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row className="form-row">
              {/* General Form Error */}
              <Form.Error message={errors.root?.message} />

              {/* Full Name */}
              <Form.Field className={fieldClass}>
                <Form.Label htmlFor="fullName" required>
                  Full Name
                </Form.Label>
                <Form.Input
                  name="fullName"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
              </Form.Field>

              {/* Email */}
              <Form.Field className={fieldClass}>
                <Form.Label htmlFor="email" required>
                  Email Address
                </Form.Label>
                <Form.Input
                  name="email"
                  type="email"
                  placeholder="staff@hotel.com"
                  disabled={isSubmitting}
                />
              </Form.Field>

              {/* Password */}
              <Form.Field className={fieldClass}>
                <Form.Label htmlFor="password" required>
                  Password
                </Form.Label>
                <Form.Password
                  name="password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
              </Form.Field>

              {/* Confirm Password */}
              <Form.Field className={fieldClass}>
                <Form.Label htmlFor="confirmPassword" required>
                  Confirm Password
                </Form.Label>
                <Form.Password
                  name="confirmPassword"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
              </Form.Field>

              {/* Admin Access Checkbox 1*/}
              <div className="pt-4">
                <Form.Checkbox
                  name="role"
                  icon="shield"
                  label="Administrative Access"
                  description="New users will have restricted permissions by default."
                  disabled={isSubmitting}
                />
              </div>

              {/* Actions */}
              <Form.Actions className="pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                   disabled={isSubmitting || !isDirty || isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                   disabled={isSubmitting || !isDirty || isPending || !isAdmin}
                  icon={
                    isSubmitting ? (
                      <Icon name="refresh" className="animate-spin" size={18} />
                    ) : (
                      <Icon name="person_add" size={18} />
                    )
                  }
                >
                  {isSubmitting ? "Creating User..." : "Create User"}
                </Button>
              </Form.Actions>
            </Form.Row>
          </Form>
        </FormProvider>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Icon name="lock" size={14} />
            <span className="uppercase font-semibold tracking-wider">
              Secure User Management
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
