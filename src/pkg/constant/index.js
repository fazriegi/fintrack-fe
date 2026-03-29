export const CURRENCY = "IDR";

export const FORMATNUMBER = (value) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const APP_NAME = import.meta.env.VITE_APP_NAME;

export const DATEFORMAT = 'DD-MM-YYYY';