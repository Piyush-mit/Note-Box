"use server"
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { post, user } from "@/db/schema";
import { auth } from "@/lib/auth"
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(title: string, content: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            return {
                success: false,
                message: "You must be logged in to create a post.",
            };
        }

        const userId = session.user.id;
        await db.insert(post).values({
            id: crypto.randomUUID(),
            title: title,
            content: content,
            userId: userId,
        });

        revalidatePath("/");

        return {
            success: true,
            message: "Post created successfully!"
        };

    } catch (error) {
        console.error("Failed to create post:", error);

        return {
            success: false,
            message: "Something went wrong. Please try again."
        };
    }
}
export async function getAllPosts() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return {
                success: false,
                message: "You must be logged in.",
                posts: [],
            };
        }

        const posts = await db
            .select({
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                userId: post.userId,
                userName: user.name,
            })
            .from(post)
            .leftJoin(user, eq(post.userId, user.id))
            .orderBy(desc(post.createdAt));

        return {
            success: true,
            posts,
        };
    } catch (error) {
        console.error("Failed to fetch posts:", error);

        return {
            success: false,
            message: "Failed to fetch posts.",
            posts: [],
        };
    }
}