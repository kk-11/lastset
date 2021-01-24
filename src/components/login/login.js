import React from 'react';
const prestate = {
	email: '',
	password: '',
	errors: {},
};

export default function Login() {
	const handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: '',
			password: '',
		};
	};

	return (
		<>
			<h4>Login below</h4>
			<form noValidate onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					onChange={handleChange}
					value={'this.state.email'}
					id="email"
					type="email"
				/>
				<input
					onChange={handleChange}
					value={'this.state.password'}
					id="password"
					type="password"
				/>
				<label htmlFor="password">Password</label>
				<button type="submit">Login</button>
			</form>
		</>
	);
}
