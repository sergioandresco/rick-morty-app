import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import GifResponsive from '../../../assets/morty.gif';

export function HeaderDashboard() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                
                <Link to="/dashboard">
                    <h4
                        className="text-[#CBE166] text-[15px] sm:text-2xl font-bold"
                        style={{ WebkitTextStroke: '1px #12B1C9' }}
                    >
                        Rick and Morty Dashboard
                    </h4>
                </Link>


                <nav className="hidden sm:flex items-center gap-4">
                    <Link
                        to="/characters"
                        className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Characters
                    </Link>
                    <Link
                        to="/characters/favorites"
                        className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Favorites
                    </Link>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: { width: 32, height: 32 },
                                },
                            }}
                        />
                    </SignedIn>
                </nav>

                <div className="sm:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-2 text-gray-700 hover:text-primary-700">
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-white shadow-lg border-l">
                            <div className="flex flex-col items-center gap-4 mt-[66px] h-full justify-between">
                                <div className="flex flex-col items-center gap-4">
                                    <Link
                                        to="/characters"
                                        className="text-base font-medium text-gray-700 hover:text-primary-600"
                                    >
                                        Characters
                                    </Link>
                                    <Link
                                        to="/characters/favorites"
                                        className="text-base font-medium text-gray-700 hover:text-primary-600"
                                    >
                                        Favorites
                                    </Link>
                                    <SignedIn>
                                        <UserButton
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    userButtonAvatarBox: { width: 40, height: 40 },
                                                },
                                            }}
                                        />
                                    </SignedIn>
                                </div>
                                <div>
                                    <img src={GifResponsive} alt="Morty Gif" />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}