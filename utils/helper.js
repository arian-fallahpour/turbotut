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

export const createQueryString = (queryObject) => {
  const str = Object.keys(queryObject).map(
    (key) => `${key}=${queryObject[key]}`
  );
  if (str.length > 0) return `${str.join("&")}`;
  else return "";
};

export function createGridTemplateColumns(dataCollection) {
  let gridTemplateColumns = dataCollection.tableFields.map(
    (field) => field.spacing
  );
  gridTemplateColumns.push("8rem");
  gridTemplateColumns = gridTemplateColumns.join(" ");
  return gridTemplateColumns;
}

export const setDefault = (value, defaultValue) => {
  return value === undefined ? defaultValue : value;
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
