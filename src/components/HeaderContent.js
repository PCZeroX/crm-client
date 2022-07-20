import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const GET_USER = gql`
	query getUser {
		getUser {
			id
			nombre
			apellido
			email
		}
	}
`;

const HeaderContent = () => {
	const router = useRouter();
	const { data, loading } = useQuery(GET_USER);
	// console.log(data);

	if (loading) return null;

	const { client, nombre, apellido } = data.getUser;

	// # Si no hay información

	// if (!data) {
	// 	return router.push("/login");
	// }

	const logout = () => {
		localStorage.removeItem("token");
		router.push("/login");
		// client.resetStore();
	};

	return (
		<div className="flex justify-between items-center">
			<p>
				Hola {nombre} {apellido}!
			</p>
			<button
				className="px-4 py-2 bg-blue-600 hover:bg-blue-700 duration-500 rounded-md text-sm"
				type="button"
				onClick={() => logout()}>
				Cerrar Sesión
			</button>
		</div>
	);
};

export default HeaderContent;
