export const formatNumber = (val, decimals = 2) => {
  if (val === undefined || val === null || isNaN(val)) return '0.00';
  return Number(val).toFixed(decimals);
};

export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

export const formatPercent = (value) => `${Number(value).toFixed(0)}%`;
