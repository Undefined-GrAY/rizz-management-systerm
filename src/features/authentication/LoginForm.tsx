import { useState } from "react";
import { useLogin } from "./useLogin";
import { SpinnerMini } from "../../ui/SpinnerMini";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Icon } from "../../ui/Icon";
import { Button } from "../../ui/Button";
import { useUser } from "./useUser";


interface LoginFormData {
  email: string;
  password: string;
}
function LoginForm() {
const methods = useForm<LoginFormData>({
    defaultValues: {
     email: "baby4choso@gmail.com",
     password:"123456",

    },
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const { handleSubmit, formState: { isSubmitting } } = methods;
  // 1. CALL THE HOOK HERE
  const { login, isPending } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    // e.preventDefault();

    const email =  data.email;
    const password =  data.password;

    if (!data.email || !data.password) return;

    console.log(email, password)
    login(
      { email, password },
      {
        onSettled: () => {
          // This runs whether the login succeeds or fails
          console.log("Login attempt finished.");
        },
      },
    );
  };
 const formInput = " pl-11 py-4 w-full bg-white/75 rounded-md dark:bg-slate-900/95 border-b border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          {/* Email Field */}
          <Form.Field>
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="mail" size={18} className="text-slate-400" />
              </div>
              <Form.Input
                name="email"
                type="email"
                disabled={isPending}
                className={formInput}
              />
            </div>
          </Form.Field>

          {/* Password Field */}
          <Form.Field>
            <div className="flex items-center justify-between mb-2">
              <Form.Label htmlFor="password">Password</Form.Label>
              <button
                type="button"
                className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="lock" size={18} className="text-slate-400" />
              </div>
              <Form.Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isPending}
                className={`${formInput} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <Icon
                  name={showPassword ? "visibility_off" : "visibility"}
                  size={18}
                />
              </button>
            </div>
          </Form.Field>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isPending}
            fullWidth
            size="lg"
            className="mt-2"
            // icon={
            //   isPending ? (
            //     <Icon name="refresh" className="animate-spin" size={18} />
            //   ) : (
            //     <Icon name="login" size={18} />
            //   )
            // }
          >
            {isPending ? <SpinnerMini /> : "Login"}
          </Button>
        </Form.Row>
      </Form>
    </FormProvider>
  );
}

export default LoginForm;
