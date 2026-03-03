import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Icon } from "./Icon";
import type {
  FormCheckboxProps,
  FormComponent,
  FormErrorProps,
  FormFieldProps,
  FormFileInputProps,
  FormInputProps,
  FormLabelProps,
  FormPasswordProps,
  FormProps,
  FormTextareaProps,
} from "../types/types";

// Main Form Component
export const Form: FormComponent = ({
  children,
  onSubmit,
  className = "",
}: FormProps) => {
  return (
    <form
      // RHF's handleSubmit will pass the event here automatically
      onSubmit={onSubmit}
      className={className}
    >
      {children}
    </form>
  );
};

// Form Row (for layout)
Form.Row = function FormRow({ children, className = "" }: FormFieldProps) {
  return (
    <div className={`${className ? className : "space-y-4"} `}>{children}</div>
  );
};

// Form Field (wraps label + input + error)
Form.Field = function FormField({ children, className = "" }: FormFieldProps) {
  return (
    <div className={`${className ? className : ""} space-y-2`}>{children}</div>
  );
};

// Form Label
Form.Label = function FormLabel({
  children,
  htmlFor,
  required,
  className = "",
  ...props
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className ? className : "block text-sm font-semibold text-slate-700 dark:text-slate-300"}  ${className} `}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

// Form Input
Form.Input = function FormInput({
  name,
  type = "text",
  placeholder,
  disabled,
  className = "",
  validation,
  ...props
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const customInputStyle =
    "w-full px-4 py-2.5 bg-white dark:bg-slate-900 border-2 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed focus:border-primary";

  return (
    <div>
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={` ${className ? className : customInputStyle}
  
          border-slate-200 dark:border-slate-700 focus:border-primary 
          
        `}
        {...props}
      />
      {error?.message && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <Icon name="error" size={16} />
          {String(error.message)}
        </p>
      )}
    </div>
  );
};

// Form Password Input (with show/hide)
Form.Password = function FormPassword({
  name,
  placeholder,
  disabled,
  className = "",
  ...props
}: FormPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <>
      <div className="relative">
        <input
          {...register(name)}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 pr-12
            bg-white dark:bg-slate-900
            border-2 rounded-lg
            text-slate-900 dark:text-white
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-primary/20
            transition-all
            disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-slate-200 dark:border-slate-700 focus:border-primary"
            }
            ${className}
          `}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <Icon
            name={showPassword ? "visibility_off" : "visibility"}
            size={20}
          />
        </button>
      </div>
      {error?.message && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <Icon name="error" size={16} />
          {String(error.message)}
        </p>
      )}
    </>
  );
};

// Form Checkbox
Form.Checkbox = function FormCheckbox({
  name,
  label,
  description,
  icon,
  className = "",
  ...props
}: FormCheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <>
      <label
        className={`flex items-start gap-3 cursor-pointer group ${className}`}
      >
        <div className="relative mt-1">
          <input
            {...register(name)}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className="size-5 rounded border-2 border-slate-300 dark:border-slate-600 peer-checked:bg-primary peer-checked:border-primary transition-all">
            <Icon
              name="check"
              size={14}
              className="text-white opacity-0 peer-checked:opacity-100"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={icon} size={18} className="text-primary" />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {label}
              </p>
              {description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </label>
      {error?.message && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <Icon name="error" size={16} />
          {String(error.message)}
        </p>
      )}
    </>
  );
};

// Form Actions (for buttons)
Form.Actions = function FormActions({
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex items-center justify-end gap-3 pt-4 ${className}`}>
      {children}
    </div>
  );
};

// Form Error Message (general form error)
Form.Error = function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg ${className}`}
    >
      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
        <Icon name="error" size={20} />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

// Form Success Message
Form.Success = function FormSuccess({ message, className = "" }) {
  if (!message) return null;

  return (
    <div
      className={`p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg ${className}`}
    >
      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
        <Icon name="check_circle" size={20} />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

// text area
Form.TextArea = function FormTextArea({
  name,
  placeholder,
  className = "",
  validation,
  ...props
}: FormTextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const customTextareaStyle =
    "w-full px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed resize-none";

  return (
    <div>
      <textarea
        {...register(name, validation)}
        placeholder={placeholder}
        {...props}
        id={name}
        className={` ${className ? className : customTextareaStyle}
          border-slate-200 dark:border-slate-700 focus:border-primary
        `}
      />

      {error?.message && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <Icon name="error" size={16} />
          {String(error.message)}
        </p>
      )}
    </div>
  );
};

Form.FileInput = function FileInput({
  name,
  accept,
  className = "",
  validation,
  ...props
}: FormFileInputProps) {
  const [fileName, setFileName] = useState<string>("");
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const customFileInputStyle =
    " lg:w-full px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed";
  return (
    <div>
      <input
        type="file" // Hardcoded as file
        accept={accept}
        id={name}
        {...register(name, {
          ...validation,
          onChange: (e) => {
            const file = e.target.files?.[0];
            setFileName(file ? file.name : "");
          },
        })}
        {...props}
        className={`${className ? className : customFileInputStyle}
          border-slate-200 dark:border-slate-700 focus:border-primary
        sr-only `}
        {...props}
      />

      {/* Custom button */}
      <Form.Label
        htmlFor={name}
        className="flex items-center justify-between gap-3 w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors "
      >
        <span className="truncate text-slate-500 dark:text-slate-400">
          {fileName || "Choose file..."}
        </span>
        <span className="shrink-0 px-3 py-1 bg-primary text-white rounded-md text-xs font-medium">
          Browse
        </span>
      </Form.Label>

      {error?.message && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <Icon name="error" size={16} />
          {String(error.message)}
        </p>
      )}
    </div>
  );
};
