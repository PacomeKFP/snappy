export const formatTime = (date: Date): string => {
	const d = new Date(date);
	return d.toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const formatDate = (date: Date): string => {
	const d = new Date(date);

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const messageDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

	if (messageDate.getTime() === today.getTime()) {
		return "Aujourd'hui";
	} else if (messageDate.getTime() === yesterday.getTime()) {
		return "Hier";
	} else {
		return d.toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	}
};

export const isSameDay = (date1: Date, date2: Date) => {
	return date1.toDateString() === date2.toDateString();
};