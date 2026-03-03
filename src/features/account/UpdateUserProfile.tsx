import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import { useUpdateUser } from "../authentication/useUpdateUser";
import { useUser } from "../authentication/useUser";
import { Spinner } from "../../ui/Spinner";

export default function UpdateUserProfile() {
  const { user, isPending: loadingMetaData } = useUser();
  const {
    fullName: currentFullName,
    avatar: currentAvatar,
    email: userEmail,
  } = user?.user_metadata || {};
  const [photoPreview, setPhotoPreview] = useState(currentAvatar || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const methods = useForm({
    defaultValues: {
      fullName: currentFullName || "",
      avatarUrl: currentAvatar || "",
      email: userEmail || "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { updateUser, isPending } = useUpdateUser();
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Update profile:", {
        ...data,
        photo: selectedFile,
      });
      updateUser({
        fullName: data.fullName,
        email: data.email,
        avatar: selectedFile,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loadingMetaData) return <Spinner />;

  const fieldClass =
    "lg:grid lg:grid-cols-[16rem_1fr] lg:items-center gap-6 py-3 md:py-5 border-gray-100 dark:border-slate-800 last:border-0";
  return (
    <div className="bg-white dark:bg-slate-900 md:rounded-xl md:border border-slate-200 dark:border-slate-800 shadow-sm p-4 md:p-8">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            {/* Profile Photo Upload */}
            <div className="flex items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="shrink-0">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Profile photo
                </p>
                <div className="relative">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="size-24 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
                      <Icon
                        name="person"
                        size={40}
                        className="text-slate-400"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Profile preview
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  JPG, PNG or GIF. Max size: 1MB
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                    <Icon name="upload" size={18} />
                    Choose File
                  </span>
                </label>
              </div>
            </div>

            {/* Email Address */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="email" required>
                Email address
              </Form.Label>
              <Form.Input
                name="email"
                type="email"
                placeholder="john.doe@hotelmanager.com"
                disabled={isSubmitting || isPending}
              />
            </Form.Field>

            {/* Full Name */}
            <Form.Field className={fieldClass}>
              <Form.Label htmlFor="fullName" required>
                Full name
              </Form.Label>
              <Form.Input
                name="fullName"
                placeholder="John Doe"
                disabled={isSubmitting || isPending}
              />
            </Form.Field>

            {/* Actions */}
            <Form.Actions className="pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => methods.reset()}
                disabled={isSubmitting || isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                icon={
                  isSubmitting ? (
                    <Icon name="refresh" className="animate-spin" size={18} />
                  ) : null
                }
              >
                {isSubmitting ? "Updating..." : "Update profile"}
              </Button>
            </Form.Actions>
          </Form.Row>
        </Form>
      </FormProvider>
    </div>
  );
}
