import React from 'react';
import classNames from 'classnames'
import s from './routines.module.scss';

export default function Routines({ routines, handleClick, active }) {
	return (
		<div className={classNames(s.wrapper, active && s.active)}>
			{routines.map(routine => {
				return(
					<div
						key={routine}
						onClick={() => handleClick(routine)}
					>
						{routine}
					</div>
				)})
			}
		</div>
	);
}
