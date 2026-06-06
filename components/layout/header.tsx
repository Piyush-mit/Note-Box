import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='max-w-[100vw] mx-auto flex items-center justify-between p-4 border-b'>
        <Link href={'/'}>
            <p>NoteBox</p>
        </Link>
        <div className='flex gap-2 '>
            <Button>
                <Link href={'/login'}>Login</Link>
            </Button>
            <Button>
                <Link href={'signup'}>SignUp</Link>
            </Button>
        </div>
    </header>
  )
}
