import { z } from "zod";

export const themeSchema = z.object({
  theme: z
    .string()
    .min(3, "Theme must be at least 3 characters long.")
    .max(50, "Theme must be less than 50 characters.")
    .regex(
      /^[A-Za-z0-9\s'-]+$/,
      "Theme can only contain letters, numbers, spaces, apostrophes, or hyphens."
    ),
});

export type ThemeFormData = z.infer<typeof themeSchema>;
