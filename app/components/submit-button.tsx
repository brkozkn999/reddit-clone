"use client"
import React from 'react'
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp, Loader, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
    textNormal: string;
    textDisabled: string;
    className?: string;
    disabled?: boolean;
}

function SubmitButton({ textNormal, textDisabled, className, disabled }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button type="submit" disabled={pending || disabled} className={className}>
                    <Loader className='inline-flex mr-2 h-4 w-4 animate-spin' /> {textDisabled}</Button>
            ) : (
                <Button type="submit" className={className} disabled={disabled}>{textNormal}</Button>
            )}
        </>
    )
}

export default SubmitButton

export function UpVote() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button variant="voteArrow" className='text-primary' size="icon" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
            ) : (
                <Button variant="voteArrow" size="sm" type="submit">
                    <ArrowUp className="h-4 w-4" />
                </Button>
            )}
        </>
    );
}
export function DownVote() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button variant="voteArrow" className='text-primary' size="icon" disabled>
                    <Loader2 className="h-3 w-3 animate-spin" />
                </Button>
            ) : (
                <Button variant="voteArrow" size="sm" type="submit">
                    <ArrowDown className="h-4 w-4" />
                </Button>
            )}
        </>
    );
}