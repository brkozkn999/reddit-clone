"use client"
import { useFormState } from "react-dom";
import { updateSubDescription } from "../actions"
import SubmitButton from "./submit-button"
import { Textarea } from "./ui/textarea"
import { useEffect } from "react";
import { useToast } from "@/app/components/ui/use-toast";

interface SubDescriptionFormProps {
    subName: string;
    description: string | null | undefined;
}

const initialState = {
    message: "",
    status: ""
}

function SubDescriptionForm({ subName, description }: SubDescriptionFormProps) {
    const [state, formAction] = useFormState(updateSubDescription, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state?.status === "success") {
            toast({
                title: "Successfull!",
                description: state.message
            })
        } else if (state?.status === "error") {
            toast({
                title: "Error!",
                description: state.message,
                variant: "destructive"
            })
        }
    }, [state, toast]);

    return (
        <form className='mt-3' action={formAction}>
            <input type='hidden' name='subName' value={subName} />
            <Textarea placeholder='Create your custom description for your subreddit...' maxLength={100} name='description' defaultValue={description ?? undefined} />
            <SubmitButton className='mt-3 w-full' textNormal='Save' textDisabled='Saving...' />
        </form>
    )
}

export default SubDescriptionForm