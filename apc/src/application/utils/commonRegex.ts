/* eslint-disable no-useless-escape */
export const urlValidator = /^((http|https|ftp):\/\/(www\.)?)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const base64Validator = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

export const percentageValidator = /^\d+(\.\d+)?%$/;
