export const getCountdownMessage = (timeInSeconds: number) => {
    let seconds = timeInSeconds;
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;

    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let message: string[] = []
    days > 0 ? days === 1 ? message.push("1 dia") : message.push(`${days} dias`) : "";
    hours > 0 ? hours === 1 ? message.push("1 hora") : message.push(`${hours} horas`) : "";
    minutes > 0 ? minutes === 1 ? message.push("1 minuto") : message.push(`${minutes} minutos`) : "";
    seconds > 0 ? seconds === 1 ? message.push("1 segundo") : message.push(`${seconds} segundos`) : "";

    return message.join(" ");
}