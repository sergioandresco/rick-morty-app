import { Header } from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Footer from "@/components/footer";

export default function HomePage() {
	return (
		<>
			<Header />
			<section>

				<div className="min-h-screen">
					<Hero />
				</div>

				<div className="min-h-screen">
					<About />
				</div>

				<Footer />

			</section>
		</>
	);
}