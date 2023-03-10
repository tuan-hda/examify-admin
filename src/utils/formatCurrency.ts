export const printPrice = (price: string) => {
  let temp;
  temp = price || ''.toString();
  let dot = '.';
  let k = 0;
  for (let i = temp.length - 1; i >= 0; i--) {
    ++k;
    if (k % 3 === 0 && i !== 0) {
      temp = [temp.slice(0, i), dot, temp.slice(i)].join('');
    }
  }
  return temp;
};

export const convertTimeHours = (time: number) => {
  if (!time) return 0;
  let hours = Math.floor(Number(time) / 3600);

  return hours;
};

export const convertTimeMinutes = (time: number) => {
  if (!time) return 0;
  let hours = Math.floor(Number(time) / 3600);
  let minutes = Math.floor((Number(time) - hours * 3600) / 60);

  return minutes;
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
