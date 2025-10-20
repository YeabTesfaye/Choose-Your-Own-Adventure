import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long.")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "First name can only contain letters, spaces, apostrophes, or hyphens."
    ),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long.")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "Last name can only contain letters, spaces, apostrophes, or hyphens."
    ),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter.")
    .regex(/\d/, "Password must include at least one number.")
    .regex(
      /[@$!%*?&]/,
      "Password must include at least one special character."
    ),
});

export type SignupFormData = z.infer<typeof signupSchema>;
