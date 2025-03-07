import { Card } from "@/app/components/ui/card";
import { MessageCircle, Trash2, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CopyLink from "./copy-link";
import { handleVote } from "../actions";
import { DownVote, UpVote } from "./submit-button";
import { RenderToJson } from "./render-to-json";
import DeletePost from "./delete-post";

interface iAppProps {
    title: string;
    jsonContent: any;
    id: string;
    subName: string;
    userName: string;
    imageString: string | null;
    voteCount: number;
    commentAmount: number;
}

export function PostCard({
    id,
    imageString,
    jsonContent,
    subName,
    title,
    userName,
    voteCount,
    commentAmount,
}: iAppProps) {
    return (
        <Card className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-1 bg-gradient-to-b from-muted/25 via-muted/60 to-muted/85 p-2">
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="postId" value={id} />
                    <UpVote />
                </form>
                <span className="text-sm">{voteCount}</span>
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="DOWN" />
                    <input type="hidden" name="postId" value={id} />
                    <DownVote />
                </form>
            </div>

            <div>
                <div className="flex items-center gap-x-2 p-2">
                    <Link className="font-semibold text-xs" href={`/r/${subName}`}>
                        r/{subName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        Posted by: <span className="hover:text-primary">u/{userName}</span>
                    </p>
                </div>

                <div className="px-2">
                    <Link href={`/post/${id}`}>
                        <h1 className="font-medium mt-1 text-lg">{title}</h1>
                    </Link>
                </div>

                <div className="max-h-[300px] overflow-hidden">
                    {imageString ? (
                        <Image
                            src={imageString}
                            alt="Post Image"
                            width={600}
                            height={300}
                            className="w-full h-full"
                        />
                    ) : (
                        <RenderToJson data={jsonContent} />
                    )}
                </div>

                <div className="m-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-1">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground font-medium text-xs">
                            {commentAmount} Comments
                        </p>
                    </div>
                    <CopyLink id={id} />
                    <DeletePost id={id} />
                </div>
            </div>
        </Card>
    );
}