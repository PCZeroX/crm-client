import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLinks = [
	{ name: "Home", href: "/" },
	{ name: "Register", href: "/register" },
	{ name: "Login", href: "/login" },
];

const Navbar = () => {
	const router = useRouter();
	return (
		<header className="bg-gradient-to-r from-sky-700 to-blue-600 border-b-gray-400/25 border-b">
			<div className="max-w-6xl mx-auto">
				<nav className="flex justify-between items-center xl:mx-0 mx-4 h-14">
					<Link href="/">
						<a>
							<Image src="/vercel-white.svg" width={128} height={32} />
						</a>
					</Link>
					<menu>
						<ul className="flex space-x-4">
							{NavLinks.map(({ name, href }, index) => {
								return (
									<li key={index} className={router.pathname === href ? "" : null}>
										<Link href={href}>
											<a className="block">{name}</a>
										</Link>
									</li>
								);
							})}
						</ul>
					</menu>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
