import LoginForm from "../features/authentication/LoginForm";
import { Icon } from "../ui/Icon";
import Logo from "../ui/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  sm:p-4 relative overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80')`,
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 backdrop-blur-md  bg-black/50 dark:bg-black/40" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full md: max-w-md">
        {/* Glassmorphism Card */}
        <div className="bg-white/67 dark:bg-slate-900/95 backdrop-blur-2xl sm:rounded-2xl shadow-2xl p-4 md:p-8 border border-white/20 dark:border-slate-700/50 ">
          {/* Logo */}
          <div className="flex justify-center mb-6">
           <Logo className="size-18" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 capitalize">
              rizz Management system
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Log in to your account
            </p>
          </div>

          <LoginForm />

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trouble logging in?{" "}
              <button className="text-primary hover:text-primary-dark font-medium transition-colors">
                Contact IT Support
              </button>
            </p>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-1">
            rizz Management system
          </p>
          <p className="text-xs text-white/60">
            © 2026 Professional Management Solutions
          </p>
        </div>
      </div>
    </div>
  );
}
