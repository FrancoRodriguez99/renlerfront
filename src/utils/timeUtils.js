function parseDuration(duration) {
  if (!duration) {
    return 0;
  }

  const [days, hours, minutes] = duration.split(",").map(Number);
  const durationMilliseconds = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  return durationMilliseconds;
}

export function calculateRemainingTime(started, takes) {
  const durationMilliseconds = parseDuration(takes);
  const startTime = new Date(started);
  const targetCompletionTime = new Date(startTime.getTime() + durationMilliseconds);
  const currentTime = new Date();
  const remainingTimeMilliseconds = targetCompletionTime - currentTime;
  const remainingTime = remainingTimeMilliseconds >= 0 ? remainingTimeMilliseconds : 0;
  return remainingTime;
}

export function formatTime(milliseconds) {
  if (milliseconds <= 0) {
    return "0:0:0:0";
  }

  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  return days + ":" + hours + ":" + minutes + ":" + seconds;
}
