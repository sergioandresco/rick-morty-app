import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export function HeaderDashboard(){
    return(
        <div>
            <Link
                to="/characters/favorites"
                className="text-lg font-semibold text-gray-900 hover:text-blue-600"
            >
                Favorites
            </Link>
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