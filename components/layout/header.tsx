import { Button } from '../ui/button'
import Link from 'next/link'

export default function Header() {
    return (
        <header className='border-b top-0 w-full fixed'>
            <div className='max-w-5xl mx-auto flex items-center justify-between p-4'>
                <Link href={'/'}>
                    <p>NoteBox</p>
                </Link>
                <nav className='flex items-center gap-2'>
                    <Button variant={"outline"}>
                        <Link href={'/login'}>Login</Link>
                    </Button>
                    <Button>
                        <Link href={'signup'}>SignUp</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}
