import React from 'react'
import Image from 'next/image'
import pfp from '@/public/pfp.png'
import { Card } from './ui/card'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ImageDown, Link2 } from 'lucide-react'

function CreatePostCard() {
    return (
        <Card className='px-4 py-2 flex items-center gap-x-4'>
            <Image src={pfp} alt='pfp' className='h-12 w-fit' />
            <Link href={'/r/test/create'} className='w-full'>
                <Input placeholder='Create Post' />
            </Link>

            <div className='flex items-center gap-x-4'>
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/r/test/create'} className='w-full'>
                        <ImageDown className='w-4 h-4' />
                    </Link>
                </Button>

                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={'/r/test/create'} className='w-full'>
                        <Link2 className='w-4 h-4' />
                    </Link>
                </Button>
            </div>
        </Card>
    )
}

export default CreatePostCard