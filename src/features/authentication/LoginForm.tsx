import { useState } from "react";
import { useLogin } from "./useLogin";
import { SpinnerMini } from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("baby4choso@gmail.com");
  const [password, setPassword] = useState("123456");

  // 1. CALL THE HOOK HERE
  const { login, isPending } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;


    login(
      { email, password },
      {
        onSettled: () => {
          // This runs whether the login succeeds or fails
          console.log("Login attempt finished.");
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending} // Disable while loading
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
      />

      {/* 3. SHOW LOADING STATE */}
      <button type="submit" disabled={isPending}>
        {isPending ? <SpinnerMini /> : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
