import { SignedIn, UserButton } from "@clerk/clerk-react";

export function HeaderDashboard(){
    return(
        <div>
            <SignedIn>
                <UserButton appearance={{
                    elements: {
                        userButtonAvatarBox: { width: 32, height: 32 }
                    }
                }} />
            </SignedIn>
        </div>
    )
}