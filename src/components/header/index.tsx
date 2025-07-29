import { useState, useEffect } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur shadow" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <motion.h1
          className="text-xl font-extrabold text-white md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-gradient-to-r from-yellow-300 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Rick and Morty Docs
          </span>
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
              <button className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}