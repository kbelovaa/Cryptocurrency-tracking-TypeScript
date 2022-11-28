export const round = (number: string | number): number =>
  Number(String(Math.round(Number(number) * 1000) / 1000).replace(/[,.]?0+$/, ''));

export const convert = (number: string | null): number | string => {
  if (number === null) {
    return 0;
  }

  switch (String(Math.round(Number(number))).length) {
    case 1:
    case 2:
    case 3:
      return Math.round(Number(number) * 100) / 100;
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
    default:
      return `${Math.round((Number(number) / 1000000000000) * 100) / 100}T`;
  }
};
