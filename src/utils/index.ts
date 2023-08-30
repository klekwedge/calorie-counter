const LEAD_ZERO = /^0+/;
const NOT_NUMBERS = /[^\d]/g;

export const formatNumber = (num: number) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1 `);
export const formatInput = (input: any) => input.value.replace(NOT_NUMBERS, ``).replace(LEAD_ZERO, ``);
