import React from 'react';
import classnames from 'classnames';
import s from './modal.module.scss';

export default function Modal({ open, closeModal, children }) {
	return (
		<div className={s.backdrop} onClick={closeModal}>
			<div
				className={classnames(s.wrapper, open && s.open)}
				onClick={(evt) => evt.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}
