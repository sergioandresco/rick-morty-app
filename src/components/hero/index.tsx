import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button';
import GifHero from '../../assets/rick-morty-gif.gif';

function Hero() {
    return (

        <div
            className="relative min-h-screen flex items-center justify-center text-center text-white px-6"
            style={{
                backgroundImage: `url(${GifHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative z-10 max-w-3xl flex flex-col gap-1">

                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Welcome to the
                    </h1>
                    <img src="https://media.cdn.adultswim.com/uploads/20210428/21428161947-rick-and-morty-logo-png.png" alt="Rick and Morty Logo" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Universe
                    </h1>
                </div>

                <p className="text-lg md:text-xl mb-8">
                    Explore characters, mark your favorites, and leave comments.
                </p>

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
            </div>
        </div>
    );
}

export default Hero;