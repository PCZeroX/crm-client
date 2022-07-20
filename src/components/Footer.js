import Image from "next/image";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-sky-700 to-blue-600">
			<div className="flex justify-center items-center max-w-4xl mx-auto h-14">
				<a
					className="flex items-center gap-1"
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer">
					Powered by <Image src="/vercel-white.svg" alt="Vercel Logo" width={72} height={16} />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
