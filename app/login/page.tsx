"use client"

import { LoginForm } from "@/components/login-form"
import { GalleryVerticalEndIcon, NotebookTabs } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <NotebookTabs scale={0.5}/>
          </div>
          Note Box
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
