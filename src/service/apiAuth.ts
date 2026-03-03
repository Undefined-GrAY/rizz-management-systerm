import type { User } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";
import { supabaseAdmin } from "./supabaseAdmin";

// We define exactly what we need
interface LoginArgs {
  email: string;
  password: string;
}

export async function login({
  email,
  password,
}: LoginArgs): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }


  return data.user;
}

export async function getCurrentUser(): Promise<User | null> {
  // Check if there is an active session
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;

  // Fetch the user
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user as User;
}

interface SignupArgs {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export async function signup({ fullName, email, password, role }: SignupArgs) {
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatarUrl: "",
        role,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({
  fullName,
  avatar,
  email, // New param
}: {
  fullName?: string;
  avatar?: File;
  email?: string; // New type definition
}) {
  // 1. Update the User's Primary Data (Email) and Metadata (Name)

  let updateData: any = {};
  
  if (fullName) updateData.data = { fullName };
  if (email) updateData.email = email; 

  const { data, error } = await supabase.auth.updateUser(updateData);
  
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the Avatar Image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update the avatar URL in Metadata
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}






export async function logout() {
  // 1. Tell Supabase to kill the session
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error.message);
    throw new Error(error.message);
  }

  // 2. The session is gone. LocalStorage is cleared automatically by the client.
}