// ErrorFallback.jsx
import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Icon } from "./Icon";
import type { ErrorFallbackProps } from "../types/types";

export default function ErrorFallback({ apiError }: ErrorFallbackProps) {
  const error = useRouteError();
  const navigate = useNavigate();

  if (apiError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
        <div className="max-w-md w-full text-center">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="size-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Icon
                name="face"
                size={40}
                className="text-red-600 dark:text-red-400"
              />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {String(apiError)}
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-2">
            {error?.statusText ||
              error?.message ||
              "Check your internet or try again later😔."}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button
              onClick={() => navigate(-1)}
              variant="secondary"
              icon={<Icon name="arrow_back" size={18} />}
            >
              Go Back
            </Button>

            <Button
              onClick={() => navigate("/")}
              icon={<Icon name="home" size={18} />}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="size-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Icon
              name="error"
              size={40}
              className="text-red-600 dark:text-red-400"
            />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Oops! Something went wrong
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-2">
          {error?.statusText ||
            error?.message ||
            "An unexpected error occurred"}
        </p>

        {error?.status && (
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
            Error Code: {error.status}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            icon={<Icon name="arrow_back" size={18} />}
          >
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            icon={<Icon name="home" size={18} />}
          >
            Go Home
          </Button>
        </div>

        {/* Dev Info - Only show in development */}
        {import.meta.env.DEV && error?.stack && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Show Error Details (Dev Only)
            </summary>
            <pre className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs overflow-auto text-red-600 dark:text-red-400">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
