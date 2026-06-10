"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { createPost } from "@/actions/post"
import Container from "@/components/layout/container"

const createPostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z
        .string()
        .min(1, "Content is required")
        .max(500, "Content must be at most 500 characters"),
})

type createPostValues = z.infer<typeof createPostSchema>

export default function CreatePost({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession();
    const [loading, setLoading] = React.useState(false)
    const form = useForm<createPostValues>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })
    const router = useRouter()
    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner />
            </div>
        )
    }
    if (!isPending && !session) {
        router.push("/login");
        return null;
    }

    async function onSubmit(values: createPostValues) {
    try {
        setLoading(true)
        console.log(values);
        const res = await createPost(values.title, values.content)
        
        if (!res) {
            toast.error("No response received from the server.")
            return
        }
        if (res.success) {
            toast.success(res.message)
            router.push("/")
        } else {
            toast.error(res.message)
        }
    } catch (error) {
        console.error(error)
        toast.error("An unexpected error occurred while creating your post.")
    } finally {
        setLoading(false)
    }
}

    return (
        <Container>
            <Card className="mx-auto mt-40 w-full sm:max-w-sm">
                <CardHeader>
                    <CardTitle>Create post</CardTitle>
                    <CardDescription>
                        Create a new post to share with the world
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="create-post" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="create-post-title">Title</FieldLabel>
                                        <Input
                                            {...field}
                                            id="create-post-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your title"
                                            autoComplete="on"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="content"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="create-post-content">
                                            Content
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="create-post-content"
                                                rows={8}
                                                placeholder="Enter your content"
                                                aria-invalid={fieldState.invalid}
                                                maxLength={500}
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupText>
                                                    {field.value.length}/500
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                            className="w-1/2"
                        >
                            Reset
                        </Button>
                        <Button type="submit" form="create-post" className="w-1/2">
                            {loading ? (
                                <>
                                    <Spinner /> 
                                </>
                            ) : (
                                "Create Post"
                            )}
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </Container>
    )
}