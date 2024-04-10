'use client'

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import Logo from './Logo'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import Spinner from './ui/spinner'

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScrollTop()

    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 items-center flex w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />

            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}

                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode='modal'>
                            <Button variant='ghost' size='sm'>
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode='modal'>
                            <Button size='sm'>
                                Get Jotion free
                            </Button>
                        </SignInButton>
                    </>
                )}

                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant='ghost' size='sm' asChild>
                            <Link href='/documents'>
                                Enter Jotion
                            </Link>
                        </Button>
                        <UserButton 
                            afterSignOutUrl='/'
                        />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}

export default Navbar