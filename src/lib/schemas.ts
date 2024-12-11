import { z } from "zod";

const passwordRegex = new RegExp(
  "^(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&'()*+,-./:;<=>?@\\[\\]^_{|}~]).+$"
);

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid e-mail address." })
    .min(1, { message: "This field is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters long." })
      .max(50, { message: "Username can't be longer than 50 characters." }),
    email: z.string().email({ message: "Invalid e-mail address." }),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must contain a capital letter, a special character, a digit and be at least 9 characters long.",
    }),
    repeatPass: z.string(),
  })
  .refine((data) => data.password === data.repeatPass, {
    message: "Passwords don't match.",
    path: ["repeatPass"],
  });

export const passwordChangeInitSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "This field is required" }),
});

export const changePasswordFormSchema = z
  .object({
    password: z.string().regex(passwordRegex, {
      message:
        "Password must contain a capital letter, a special character, a digit and be at least 9 characters long.",
    }),
    repeat: z.string(),
  })
  .refine((data) => data.password === data.repeat, {
    message: "Passwords don't match",
    path: ["repeat"],
  });

export const modifyUserFormSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long." })
    .max(50, { message: "Username can't be longer than 50 characters." }),
  email: z.string().email({ message: "Invalid e-mail address." }),
});
