import Container from "@/components/layout/container";
import { getAllPosts } from "@/actions/post";
import { cn } from "@/lib/utils";
import PostCard from "@/components/utils/post-card";

export default async function Page() {
  const res = await getAllPosts();
  if (!res.success) {
    return (
      <Container className={cn("mt-16")}>
        <p className="text-center text-muted-foreground">
          {res.message}
        </p>
      </Container>
    );
  }

  return (
    <Container className={cn("mt-16")}>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {res.posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No posts found.
          </p>
        ) : (
          res.posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              author={post.userName ?? "Unknown User"}
              createdAt={post.createdAt}
            />
          ))
        )}
      </div>
    </Container>
  );
}