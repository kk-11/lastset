import React, { useState } from 'react';
import s from './login.module.scss';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className={s.wrapper}>
			<h4>Sign in to get regular backups</h4>
			<form noValidate onSubmit={handleSubmit} className={s.form}>
				<label htmlFor="email">Email</label>
				<input
					className={s.input}
					onChange={handleEmail}
					value={email}
					type="email"
				/>
				<label htmlFor="password">Password</label>
				<input
					className={s.input}
					onChange={handlePassword}
					value={password}
					type="password"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
