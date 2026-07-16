export function getPercentageChange(current, previous) {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return (((current - previous) / previous) * 100).toFixed(1);
}

export function getTrend(current, previous) {
  return current >= previous ? "up" : "down";
}