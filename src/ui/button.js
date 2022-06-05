const Button = ({ children, label, ...rest }) => (
	<button
		onTouchStart={(evt) => evt.stopPropagation()}
		onTouchEnd={(evt) => evt.stopPropagation()}
		{...rest}>
		{children || label}
	</button>
);

export default Button;
