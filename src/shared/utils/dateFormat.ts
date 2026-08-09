export const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("pt-BR");
};

export const formatTime = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});
};
