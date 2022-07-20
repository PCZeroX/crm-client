import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";

const REGISTER_USER = gql`
	mutation RegisterUser($register: RegisterInput) {
		registerUser(register: $register) {
			_id
			username
			email
			password
		}
	}
`;

const Register = () => {
	const router = useRouter();

	const [registerUser] = useMutation(REGISTER_USER);

	const [message, setMessage] = useState(null);

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},

		validationSchema: Yup.object({
			username: Yup.string().required("El username es obligatorio 😈"),
			email: Yup.string().email("El email no es válido 😈").required("El email es obligatorio 😈"),
			password: Yup.string()
				.required("El password no puede ir vacío 😈")
				.min(6, "El password debe ser de al menos 6 caracteres 😈"),
		}),

		onSubmit: async (values) => {
			const { username, email, password } = values;

			try {
				const { data } = await registerUser({
					variables: {
						register: {
							username,
							email,
							password,
						},
					},
				});
				// console.log(data);

				setMessage(`Se creó correctamente el usuario: ${data.registerUser.username}`);

				setTimeout(() => {
					setMessage(null);
					router.push("/login");
				}, 5000);
			} catch (error) {
				setMessage(error.message);

				setTimeout(() => {
					setMessage(null);
				}, 5000);
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
			<h1 className="text-center text-2xl text-white font-semibold capitalize">Crear nueva cuenta</h1>

			{message && showMessage()}

			<div className="flex justify-center px-4">
				<div className="w-full max-w-md">
					<form className="bg-gray-700 rounded-md shadow-md p-8 space-y-8" onSubmit={formik.handleSubmit}>
						{/* // # Username */}
						<div className="space-y-4">
							<label className="block text-sm font-semibold" htmlFor="username">
								Username
							</label>
							<input
								className="shadow appearance-none focus:ring-blue-500 focus:ring rounded w-full p-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 duration-500 placeholder:text-gray-500"
								id="username"
								type="text"
								placeholder="JohnDoe"
								onChange={formik.handleChange}
								value={formik.values.username}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.nombre && formik.errors.nombre ? (
							<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p className="text-sm">{formik.errors.nombre}</p>
							</div>
						) : null}

						{formik.touched.apellido && formik.errors.apellido ? (
							<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p className="text-sm">{formik.errors.apellido}</p>
							</div>
						) : null}

						{/* // # Email */}
						<div className="space-y-4">
							<label className="block text-sm font-semibold" htmlFor="email">
								Email
							</label>
							<input
								className="shadow appearance-none focus:ring-blue-500 focus:ring rounded w-full p-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 duration-500 placeholder:text-gray-500"
								id="email"
								autoComplete="off"
								type="email"
								placeholder="johndoe@email.com"
								onChange={formik.handleChange}
								value={formik.values.email}
								onBlur={formik.handleBlur}
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
								Password
							</label>
							<input
								className="shadow appearance-none focus:ring-blue-500 focus:ring rounded w-full p-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 duration-500 placeholder:text-gray-500"
								id="password"
								type="password"
								placeholder="password"
								onChange={formik.handleChange}
								value={formik.values.password}
								onBlur={formik.handleBlur}
							/>
						</div>
						{formik.touched.password && formik.errors.password ? (
							<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p className="text-sm">{formik.errors.password}</p>
							</div>
						) : null}

						{/* // # Términos y Condiciones */}
						<div className="flex items-center">
							<div className="flex items-center h-6">
								<input
									id="terms"
									type="checkbox"
									value=""
									className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
									required
								/>
							</div>
							<label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								I agree with the{" "}
								<a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
									terms and conditions
								</a>
							</label>
						</div>

						{/* // # Crear Cuenta */}
						<input
							type="submit"
							className="bg-gray-800 w-full p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 duration-500"
							value="Crear cuenta"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
