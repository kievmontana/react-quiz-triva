
export const timeFormat = (num) => {

    let minutes = Math.floor(num / 60);
    minutes = minutes < 10 ? (`0${minutes}`) : (minutes);

    let seconds = num % 60;
    seconds = seconds < 10 ? (`0${seconds}`) : (seconds);

    return `${minutes}:${seconds}`;
};