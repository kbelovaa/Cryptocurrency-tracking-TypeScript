export const round = (number: string | number, accuracy = 3): number => {
  if (number === null) {
    return 0;
  }
  if (Number(String(Math.round(Number(number) * 10 ** accuracy) / 10 ** accuracy).replace(/[,.]?0+$/, '')) === 0) {
    return round(number, accuracy + 1);
  }
  return Number(String(Math.round(Number(number) * 10 ** accuracy) / 10 ** accuracy).replace(/[,.]?0+$/, ''));
};

export const convert = (number: string | number | null): number | string => {
  if (number === null) {
    return 0;
  }

  switch (String(Math.round(Number(number))).length) {
    case 1:
    case 2:
    case 3:
      return round(number);
    case 4:
    case 5:
    case 6:
      return `${Math.round((Number(number) / 1000) * 100) / 100}T`;
    case 7:
    case 8:
    case 9:
      return `${Math.round((Number(number) / 1000000) * 100) / 100}M`;
    case 10:
    case 11:
    case 12:
      return `${Math.round((Number(number) / 1000000000) * 100) / 100}B`;
    case 13:
    case 14:
    case 15:
      return `${Math.round((Number(number) / 1000000000000) * 100) / 100}Tr`;
    default:
      return `${Math.round((Number(number) / 1000000000000000) * 100) / 100}Q`;
  }
};
