import { Header } from "../../ui/Header";
import UpdateUserProfile from "./UpdateUserProfile";
import UpdatePassword from "./UpdatePassword";

const mockUser = {
  name: "John Doe",
  email: "john.doe@hotelmanager.com",
  role: "Administrator",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAWvcfxh79Ly_iCOeQqqk_mnnFXZSNWyBFhmMwxxd2Z-BYs84mnWJRWpf9lgC7Ez3Tx7A1ArRROf-jKeoaweuKkWKRP9Xq2vZ0OjcSSvfV_A7ddp1XQukpKNHixnlXzwZmA5cGwn9xgpy1n8OVGhWQE1fNagbXwP9LH_NQHjw77QLkuLvEGD1Yxr6c90Xl1T4_nXGhZy1uvLl8UdYUtzQyUPW62sFNyMkR0vbShUIRjU45S5BbW8_4qww-mtzF_Ui0AO8dejVNOlD8",
};

export default function AccountSettingsPage() {


  return (
    <>
      <Header title="Profile" description="Manage your profile information" />

      <div className="md:p-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Update Profile Section */}
          <UpdateUserProfile  />

          {/* Update Password Section */}
          <UpdatePassword  />
        </div>
      </div>
    </>
  );
}
