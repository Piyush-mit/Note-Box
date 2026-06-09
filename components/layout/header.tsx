"use client"
import { Button } from '../ui/button'
import Link from 'next/link'
import UserButton from '../utils/user-button'
import { authClient } from '@/lib/auth-client'

export default function Header() {
    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession();
    return (
        <header className='border-b top-0 w-full fixed'>
            <div className='max-w-5xl mx-auto flex items-center justify-between p-4'>
                <Link href={'/'}>
                    <p>NoteBox</p>
                </Link>
                    {session ? <UserButton session={session} /> :
                        <nav className='flex items-center gap-2'>
                            <Button variant={"outline"}>
                                <Link href={'/login'}>Login</Link>
                            </Button>
                            <Button>
                                <Link href={'signup'}>SignUp</Link>
                            </Button>
                        </nav>
                    }
            </div>
        </header>
    )
}
