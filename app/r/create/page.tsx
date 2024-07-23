"use client";

import { createCommunity } from "@/app/actions";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { useToast } from "@/app/components/ui/use-toast";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import SubmitButton from "@/app/components/submit-button";

const initalState = {
    message: "",
    status: "",
};

export default function SubredditPage() {
    const [state, formAction] = useFormState(createCommunity, initalState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);
    return (
        <div className="max-w-[1000px] mx-auto  flex flex-col mt-4">
            <form action={formAction}>
                <h1 className="text-3xl font-extrabold tracking-tight">
                    Create Community
                </h1>
                <Separator className="my-4" />
                <Label className="text-lg">Name</Label>
                <p className="text-muted-foreground">
                    Community names including capitalization cannot be changed!
                </p>

                <div className="relative mt-3">
                    <p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">
                        r/
                    </p>
                    <Input
                        name="name"
                        required
                        className="pl-6"
                        minLength={2}
                        maxLength={21}
                    />
                </div>
                <p className="mt-1 text-destructive">{state.message}</p>

                <div className="w-full flex mt-5 gap-x-5 justify-end">
                    <Button variant="secondary" asChild>
                        <Link href="/">Cancel</Link>
                    </Button>
                    <SubmitButton textNormal="Create" textDisabled="Creating..." />
                </div>
            </form>
        </div>
    );
}