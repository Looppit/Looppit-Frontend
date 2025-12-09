export function formatTime(seconds: number, format: 'mm:ss' | 'ss') {
  if (format === 'mm:ss') {
    return `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  }

  return `${seconds}`;
}
