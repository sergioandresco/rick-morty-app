import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SignedIn, SignInButton, SignedOut } from "@clerk/clerk-react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#0b0c10] text-white px-6 py-10">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center">
                <Separator className="bg-[#12B1CB] w-1/2" />
                <img
                    src="https://media.cdn.adultswim.com/uploads/20210428/21428161947-rick-and-morty-logo-png.png"
                    alt="Rick and Morty Logo"
                    className="w-36 h-auto"
                />

                <div className="flex justify-center gap-4 flex-wrap">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button className="bg-[#C8DC61] text-[#0b0c10] hover:bg-[#12B1CB] cursor-pointer">
                                Start Exploring
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Link to="/characters">
                            <Button variant="secondary" className="bg-[#C8DC61] text-[#0b0c10] hover:bg-[#12B1CB] cursor-pointer">Go to Characters</Button>
                        </Link>
                    </SignedIn>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                    Development by{" "}
                    <span className="text-[#C8DC61] font-semibold">
                        Sergio Andres Cobos Suarez
                    </span>
                </p>

                <div className="flex gap-4 mt-2">
                    <a
                        href="https://github.com/sergioandresco"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C8DC61] hover:text-[#12B1CB] text-xl transition-colors"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/sergio-andres-cobos-suarez-942637219/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C8DC61] hover:text-[#12B1CB] text-xl transition-colors"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;