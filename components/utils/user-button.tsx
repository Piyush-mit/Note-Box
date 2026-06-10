"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {  Session, User } from "better-auth"
import { authClient } from "@/lib/auth-client"

export default function UserButton({ session }: { session: { user : User , session : Session} }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size={"icon-sm"}>
                <Avatar>
                    <AvatarImage src={session.user.image ? session.user.image : ""}/>
                    <AvatarFallback>{session.user.name[0]}</AvatarFallback>
                </Avatar>
            </Button>} />
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>authClient.signOut()}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                    
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
