import React from 'react';
import classNames from 'classnames'
import { createEmptyArray } from '../../utils/utils';
import s from './set.module.scss';

export default function Set({ set, sets, setSet }) {
	const a = createEmptyArray(sets);
	return(
		<div className={s.sets}>
			{a.map((circle, i) => {
				const active = set >= i;
				return(
					<div
						key={i}
						className={classNames(s.set, active && s.active)}
						onClick={() => setSet(i)}
					>
					</div>
				)
			})}
		</div>
	)
}
