import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";

const LOGIN_USER = gql`
	mutation LoginUser($login: LoginInput) {
		loginUser(login: $login) {
			token
			expiresIn
		}
	}
`;

const Login = () => {
	const router = useRouter();

	const [message, setMessage] = useState(null);
	const [loginUser] = useMutation(LOGIN_USER);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},

		validationSchema: Yup.object({
			email: Yup.string().email("El email no es válido").required("El email no puede ir vacío"),
			password: Yup.string().required("El password es obligatorio"),
		}),

		onSubmit: async (values) => {
			const { email, password } = values;

			try {
				const { data } = await loginUser({
					variables: {
						login: {
							email,
							password,
						},
					},
				});
				console.log(data);

				setMessage("Autenticando...");

				// # Guardar el token en localstorage

				// setTimeout(() => {
				// 	const { token } = data.loginUser;
				// 	localStorage.setItem("token", token);
				// }, 1000);

				setTimeout(() => {
					setMessage(null);
					router.push("/");
				}, 5000);
			} catch (error) {
				setMessage(error.message);
				setTimeout(() => {
					setMessage(null);
				}, 3000);
			}
		},
	});

	const showMessage = () => {
		return (
			<div className="bg-blue-800 p-4 w-full my-2 max-w-md text-center mx-auto rounded">
				<p>{message}</p>
			</div>
		);
	};

	return (
		<div className="grid gap-8 py-16">
			<h1 className="text-center text-2xl text-white font-semibold">Login</h1>

			{message && showMessage()}

			<div className="flex justify-center px-4">
				<div className="w-full max-w-md">
					<form className="bg-gray-700 rounded-md shadow-md p-8 space-y-8" onSubmit={formik.handleSubmit}>
						{/* // # email */}
						<div className="space-y-4">
							<label className="block text-sm font-semibold" htmlFor="email">
								Correo electrónico
							</label>
							<input
								className="shadow appearance-none focus:ring-blue-500 focus:ring rounded w-full p-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 duration-500 placeholder:text-gray-500"
								id="email"
								autoComplete="off"
								type="email"
								placeholder="Email Usuario"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
						</div>
						{formik.touched.email && formik.errors.email ? (
							<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p className="text-sm">{formik.errors.email}</p>
							</div>
						) : null}

						{/* // # password */}
						<div className="space-y-4">
							<label className="block text-sm font-semibold" htmlFor="password">
								Contraseña
							</label>
							<input
								className="shadow appearance-none focus:ring-blue-500 focus:ring rounded w-full p-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 duration-500 placeholder:text-gray-500"
								id="password"
								type="password"
								placeholder="Password Usuario"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
						</div>
						{formik.touched.password && formik.errors.password ? (
							<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p className="text-sm">{formik.errors.password}</p>
							</div>
						) : null}

						{/* // # Iniciar Sesión */}
						<input
							type="submit"
							className="bg-gray-800 w-full p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 duration-500"
							value="Iniciar sesión"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
