import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';

export function Header() {

	const [scrolled, setScrolled] = useState(false)

	const { user } = useUser()
	const role = user?.publicMetadata?.role || "user"

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10)
		}

		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur shadow" : "bg-transparent"
				}`}
		>
			<div className="flex items-center justify-between px-6 py-4">
				<motion.h1
					className="text-xl font-extrabold text-white md:text-2xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<h1
						className="text-white text-[23px] sm:text-4xl"
						style={{ WebkitTextStroke: '1px #C8DC61' }}
					>
						Rick and Morty Docs
					</h1>
				</motion.h1>

				<div className="flex items-center gap-4">
					{user && (role === "admin" || role === "user") && (
						<Link
							to="/characters"
							className="text-white hover:text-purple-300 text-sm font-medium"
						>
							Dashboard
						</Link>
					)}

					<SignedIn>
						<UserButton appearance={{ elements: { userButtonAvatarBox: { width: 32, height: 32 } } }} />
					</SignedIn>
					<SignedOut>
						<SignInButton mode="modal">
							<Button
								className="bg-[#C8DC61] text-[#0b0c10] hover:bg-[#12B1CB] cursor-pointer"
							>
								Sign In
							</Button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</header>
	)
}