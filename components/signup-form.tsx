"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"



export const signupSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters.")
      .max(32, "Name must be at most 32 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Name can only contain letters, numbers, and underscores."
      ),
    email: z
      .string()
      .email("Invalid email address.")
      .min(5, "Email must be at least 5 characters.")
      .max(100, "Email must be at most 100 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(40, "Password must be at most 40 characters."),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: SignupInput) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-up-form-name">
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="sign-up-form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-up-form-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="sign-up-form-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@gmail.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field className="">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="sign-up-form-password">
                        Password
                      </FieldLabel>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          id="sign-up-form-password"
                          aria-invalid={fieldState.invalid}
                          placeholder="password"
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-2 w-2" /> : <Eye className="h-2 w-2" />}
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="sign-up-form-confirm-password">
                        Confirm Password
                      </FieldLabel>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          id="sign-up-form-confirm-password"
                          aria-invalid={fieldState.invalid}
                          placeholder="password"
                          autoComplete="off"
                          type={showConfirmPassword ? "text" : "password"}
                        /><Button
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-2 w-2" /> : <Eye className="h-2 w-2" />}
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

              </Field>
              <Field>
                <Button type="submit" form="sign-up-form">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

      </Card>
    </div>
  )
}




{/* <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>

              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card> */}