import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import s from './timer.module.scss';

export default function Timer() {
	const [timer, setTimer] = useState(false);
	useEffect(() => {
		setTimer(true);
	}, [setTimer]);

	return <div className={classNames([s.wrapper, timer && s.active])}></div>;
}
