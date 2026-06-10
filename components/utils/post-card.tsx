import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type PostCardProps = {
  title: string;
  content: string;
  author: string;
  createdAt: Date | string;
};

export default function PostCard({
  title,
  content,
  author,
  createdAt,
}: PostCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Posted by {author} 
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="whitespace-pre-wrap wrap-break-word text-sm">
          {content}
        </p>
      </CardContent>

      <CardFooter className="text-muted-foreground text-xs ">
        Created on {formattedDate}
      </CardFooter>
    </Card>
  );
}