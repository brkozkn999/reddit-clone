"use client";

import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import SubmitButton from "./submit-button";
import { createComment } from "../actions";
import { useRef } from "react";

interface iAppPorps {
    postId: string;
}

export function CommentForm({ postId }: iAppPorps) {
    const ref = useRef<HTMLFormElement>(null);
    return (
        <form
            className="mt-5"
            action={async (formData) => {
                await createComment(formData);
                ref.current?.reset();
            }}
            ref={ref}
        >
            <input type="hidden" name="postId" value={postId} />
            <Label>Comment right here</Label>
            <Textarea
                placeholder="What are your thoughts?"
                className="w-full mt-1 mb-2"
                name="comment"
            />
            <SubmitButton textNormal="Comment" textDisabled="Commenting..." />
        </form>
    );
}