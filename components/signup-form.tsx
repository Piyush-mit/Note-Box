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
import { authClient } from "@/lib/auth-client"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"

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
    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    async function onSubmit(val: SignupInput) {
        try {
            setLoading(true);
            const { data, error } = await authClient.signUp.email({
                name: val.name,
                email: val.email,
                password: val.password,
                callbackURL: "/",
            });
            if (error) toast(error.message);
            if (data) toast("Account created successfully")
            router.push("/");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

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
                            <Field className="gap-2">
                                {/* NAME FIELD */}
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

                                {/* EMAIL FIELD */}
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
                                                type="email"
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

                                {/* PASSWORD FIELD */}
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
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* CONFIRM PASSWORD FIELD */}
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
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </Field>

                            {/* SUBMIT ACTIONS */}
                            <Field>
                                <Button type="submit" form="sign-up-form" disabled={loading}>
                                    {loading ? <Spinner /> : "Create Account"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Sign in
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}