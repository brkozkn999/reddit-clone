"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";

export async function updateInformation(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const email = formData.get("email") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const username = formData.get("username") as string;

    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                email: email,
                firstName: firstname,
                lastName: lastname,
                userName: username
            },
        });

        return {
            message: "Succesfully Updated!",
            status: "success",
        };
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "This username is alredy used",
                    status: "error",
                };
            }
        }

        throw e;
    }
}

export async function createCommunity(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    try {
        const name = formData.get("name") as string;

        const data = await prisma.subreddit.create({
            data: {
                name: name,
                userId: user.id,
            },
        });

        return redirect(`/r/${data.name}`);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "This Name is alredy used",
                    status: "error",
                };
            }
        }
        throw e;
    }
}

export async function updateSubDescription(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    try {
        const subName = formData.get("subName") as string;
        const description = formData.get("description") as string;

        await prisma.subreddit.update({
            where: {
                name: subName,
            },
            data: {
                description: description,
            },
        });

        return {
            status: "success",
            message: "Succesfully updated the description!",
        };
    } catch (e) {
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}

export async function createPost({ jsonContent }: { jsonContent: JSONContent | null }, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const subName = formData.get("subName") as string;

    const data = await prisma.post.create({
        data: {
            title: title,
            imageString: imageUrl ?? undefined,
            subName: subName,
            userId: user.id,
            textContent: jsonContent ?? undefined,
        },
    });

    return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string;
    const voteDirection = formData.get("voteDirection") as TypeOfVote;

    const vote = await prisma.vote.findFirst({
        where: {
            postId: postId,
            userId: user.id,
        },
    });

    if (vote) {
        if (vote.voteType === voteDirection) {
            await prisma.vote.delete({
                where: {
                    id: vote.id,
                },
            });

            return revalidatePath("/", "page");
        } else {
            await prisma.vote.update({
                where: {
                    id: vote.id,
                },
                data: {
                    voteType: voteDirection,
                },
            });
            return revalidatePath("/", "page");
        }
    }

    await prisma.vote.create({
        data: {
            voteType: voteDirection,
            userId: user.id,
            postId: postId,
        },
    });

    return revalidatePath("/", "page");
}

export async function createComment(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const comment = formData.get("comment") as string;
    const postId = formData.get("postId") as string;

    const data = await prisma.comment.create({
        data: {
            text: comment,
            userId: user.id,
            postId: postId,
        },
    });

    revalidatePath(`/post/${postId}`);
}

export async function deleteComment() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    //TODO: delete comment
}

export async function deletePost(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user)
        return redirect("/api/auth/login");

    const postId = formData.get('postId') as string;

    // Fetch the post information including the owner's userId
    const postInfo = await prisma.post.findUnique({
        where: { id: postId },
        select: { userId: true },
    });

    // If the post does not exist or the user is not the owner, return an error or redirect
    if (!postInfo || postInfo.userId !== user.id) {
        return {
            status: "error",
            message: "You are not authorized to delete this post.",
        };
    }

    // If the user is the owner, delete the post
    await prisma.post.delete({
        where: { id: postId },
    });

    // Revalidate the path
    revalidatePath(`/`);

    // Return a success message
    return {
        status: "success",
        message: "Post deleted successfully.",
    };
}