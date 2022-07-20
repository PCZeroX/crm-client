import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

const SidebarLinks = [
	{ name: "Clientes", href: "/clientes" },
	{ name: "Pedidos", href: "/pedidos" },
	{ name: "Productos", href: "/productos" },
];

const Sidebar = () => {
	const router = useRouter();
	return (
		<aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 p-4">
			<div>
				<p className="text-white text-2xl font-black">CRM Clientes</p>
			</div>

			<ul className="mt-5 flex flex-col gap-2">
				{SidebarLinks.map(({ name, href }, index) => {
					return (
						<li key={index} className={router.pathname === href ? "bg-blue-800" : null}>
							<Link href={href}>
								<a className="block text-white p-2">{name}</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default Sidebar;
