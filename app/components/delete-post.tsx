"use client"
import React, { useEffect } from 'react';
import { useToast } from './ui/use-toast';
import { Trash2 } from 'lucide-react';
import { deletePost } from '../actions';
import { useFormState } from 'react-dom';

const initialState = {
    message: "",
    status: ""
};

function DeletePost({ id }: { id: string }) {
    const [state, formAction] = useFormState(deletePost, initialState);
    const { toast } = useToast();
    useEffect(() => {
        if (state?.status === "success") {
            toast({
                title: "Successful!",
                description: state.message
            });
        } else if (state?.status === "error") {
            toast({
                title: "Error!",
                description: state.message,
                variant: "destructive"
            });
        }
    }, [state, toast]);

    return (
        <form action={formAction} method="POST">
            <input type="hidden" name="postId" value={id} />
            <button className='flex items-center gap-x-1' type='submit'>
                <Trash2 className='h-4 w-4 text-red-600' />
                <p className='text-xs text-red-600 font-medium'>Delete</p>
            </button>
        </form>
    );
}

export default DeletePost;