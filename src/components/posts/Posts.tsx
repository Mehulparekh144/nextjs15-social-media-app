import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelative } from "date-fns";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center">
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} size={40} />
        </Link>
        <div>
          <Link
            href={`/users/${post.user.username}`}
            className="block font-semibold hover:underline"
          >
            {post.user.displayName}
          </Link>
          <Link href={`/posts/${post.id}`} className="block text-sm text-muted-foreground hover:underline">
            {formatRelativeDate(new Date(post.createdAt))}
          </Link>
        </div>
      </div>
      <div className="whitespace-pre-line break-words">
        {post.content}
      </div>
    </article>
  );
}
