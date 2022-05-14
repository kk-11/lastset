export const updateLocalStorage = (data) => {
	const stringified = JSON.stringify(data);
	window.localStorage.setItem('lastSetWTF', stringified);
};
