import { Header } from "@/components/header";
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import GifHero from '../../assets/rick-morty-gif.gif'

export default function HomePage() {
  return (
    <>
        <Header />
        <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Rick & Morty Universe</h1>

            <img
                src={GifHero}
                alt="Rick and Morty"
                className="mx-auto w-full max-w-md mb-6 rounded-lg shadow-lg"
            />

            <p className="text-lg mb-6">
                Explore characters, mark your favorites, and leave comments. Built with ❤️ using React, GraphQL, and Tailwind.
            </p>

            <SignedOut>
                <SignInButton mode="modal">
                <Button>Start Exploring</Button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                <Link to="/characters">
                    <Button variant="secondary">Go to Characters</Button>
                </Link>
            </SignedIn>
        </section>
    </>
  );
}