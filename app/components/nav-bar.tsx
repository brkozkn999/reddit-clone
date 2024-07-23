import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RedditText from '../../public/logo-name.svg'
import RedditMobile from '../../public/reddit-full.svg'
import ThemeToggle from './theme-toggle'
import { Button } from '@/app/components/ui/button'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserDropdown from './user-dropdown'

async function NavBar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between'>
            <Link href={'/'} className='flex items-center gap-x-3'>
                <Image src={RedditMobile} alt='Reddit Mobile Icon' className='h-10 w-fit' priority draggable={false} quality={100} />
                <Image src={RedditText} alt='Reddit Desktop Text' className='h-9 w-fit hidden lg:block' draggable={false} quality={100} />
            </Link>
            <div className='flex items-center gap-x-4'>
                <ThemeToggle />

                {user ? (
                    <Button asChild>
                        <UserDropdown userImage={user.picture} />
                    </Button>
                ) : (
                    <div className='flex items-center gap-x-4'>
                        <Button variant={'secondary'} asChild>
                            <RegisterLink>
                                Sign Up
                            </RegisterLink>
                        </Button>

                        <Button asChild>
                            <LoginLink>
                                Login
                            </LoginLink>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar