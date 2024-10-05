// The file contains the validation functions for the login and signup forms.

import {z} from "zod";

const requiredString = z.string().trim().min(1 , "Required");

export const signupSchema = z.object({
  email : requiredString.email("Invalid email address"),
  username : requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,  // Only letters, numbers, underscores, and hyphens
    "Only letters, numbers, underscores, and hyphens are allowed"
  ),
  password : requiredString.min(8, "Password must be at least 8 characters long"),
})

export type SignupType = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
  username : requiredString,
  password : requiredString,
})

export type LoginType = z.infer<typeof loginSchema>;
