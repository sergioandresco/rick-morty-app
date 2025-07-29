import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function About() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-[#0b0c10] px-4 py-20">
            <div className="flex flex-col gap-6 sm:gap-11 max-w-4xl w-full space-y-6 text-white text-center">
                <h2 className="text-3xl md:text-5xl sm:text-4xl font-bold text-[#C8DC61]">
                    What is Rick and Morty Docs?
                </h2>
                <p className="text-lg text-white/80">
                    This fan-made site lets you explore your favorite characters from the Rick and Morty universe.
                    Search, filter, favorite, comment — all from one clean, fast, and responsive platform.
                </p>

                <p className="text-lg md:text-3xl text-white/80 m-0">
                    Just log in and enjoy:
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-[#1a1c1f] border-none shadow-xl hover:scale-105 transition duration-300">
                        <CardHeader>
                            <CardTitle className="text-[#12B1CB]">Explore</CardTitle>
                        </CardHeader>
                        <CardContent className="text-white/80">
                            Browse through a vast list of characters. Use filters to find exactly who you're looking for.
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1c1f] border-none shadow-xl hover:scale-105 transition duration-300">
                        <CardHeader>
                            <CardTitle className="text-[#C8DC61]">Favorite</CardTitle>
                        </CardHeader>
                        <CardContent className="text-white/80">
                            Mark characters you love the most and build your personal Rick and Morty list.
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1c1f] border-none shadow-xl hover:scale-105 transition duration-300">
                        <CardHeader>
                            <CardTitle className="text-[#8054C7]">Comment</CardTitle>
                        </CardHeader>
                        <CardContent className="text-white/80">
                            Join the fun by leaving comments and sharing your thoughts about each character.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default About;