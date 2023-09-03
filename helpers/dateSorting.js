export const dateSorting = (dateA, dateB, isDecreasing = false) => {
  if (dateA > dateB) {
    return isDecreasing ? -1 : 1;
  } else if (dateA < dateB) {
    return isDecreasing ? 1 : -1;
  }

  return 0;
};
