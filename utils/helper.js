export const join = (...classes) => classes.join(" ").trim();

export const toCap = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalize = (string) => {
  string = string.split(" ");
  string = string.map((str) => toCap(str));
  string = string.join(" ");
  return string;
};

export const toSingular = (string) => {
  return string.substring(0, string.length - 1);
};

export const setDefault = (value, defaultValue) => {
  return typeof value === "undefined" ? defaultValue : value;
};

export const debounce = (callback, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
