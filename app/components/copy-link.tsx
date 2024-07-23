"use client"
import { Share } from 'lucide-react'
import React from 'react'
import { useToast } from './ui/use-toast';

function CopyLink({ id }: { id: string }) {
    const { toast } = useToast();

    async function copyToClipboard() {
        await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
        toast({
            title: 'Success',
            description: 'Link copied to clipboard'
        });
    }

    return (
        <button className='flex items-center gap-x-1' onClick={copyToClipboard}>
            <Share className='h-4 w-4 text-muted-foreground' />
            <p className='text-xs text-muted-foreground font-medium'>Share</p>
        </button>
    )
}

export default CopyLink