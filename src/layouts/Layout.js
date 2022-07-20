import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Sidebar from "@components/Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
	const router = useRouter();

	// const [token, setToken] = useState(null);

	// useEffect(() => {
	// 	setToken(localStorage.getItem("token"));
	// }, [token]);

	return (
		<>
			<Head>
				<title>{`${router.pathname.slice(1).charAt(0).toUpperCase() + router.pathname.slice(2)} | NextJS`}</title>
				{/* <meta name="description" content={description} /> */}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />

			{router.pathname === "/" || router.pathname === "/login" || router.pathname === "/register" ? (
				<div className="bg-gray-800">{children}</div>
			) : (
				<div className="sm:flex max-w-6xl md:mx-auto">
					<Sidebar />
					<main className="sm:w-2/3 xl:w-4/5 p-4 bg-gray-700 min-h-screen">{children}</main>
				</div>
			)}
			{/* <div className="sm:flex max-w-6xl md:mx-auto">
				<Sidebar />
				<main className="sm:w-2/3 xl:w-4/5 p-4 bg-gray-700 min-h-screen">{children}</main>
			</div> */}

			{/* {token && router.pathname === "/" ? (
				<div className="sm:flex max-w-6xl md:mx-auto">
					<Sidebar />
					<main className="sm:w-2/3 xl:w-4/5 p-4 bg-gray-700 min-h-screen">{children}</main>
				</div>
			) : (
				<div className="bg-gray-800">{children}</div>
			)} */}
			{/* <main>{children}</main> */}

			<Footer />
		</>
	);
};

export default Layout;
