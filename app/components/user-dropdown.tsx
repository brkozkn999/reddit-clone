import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface UserDropdownProps {
    userImage: string | null;
}

function UserDropdown({ userImage }: UserDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3'>
                    <MenuIcon className='w-6 h-6 lg:w-5 lg:h-5' />
                    <img className='rounded-full h-8 w-8 hidden lg:block' alt='User Avatar'
                        src={userImage ?? "https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuItem>
                    <Link href={'/r/create'} className='w-full'>
                        Create Community
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={'/settings'} className='w-full'>
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogoutLink className='w-full'>
                        Logout
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown