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

export const getBody = async (req) => {
  const body = await req.json().catch((err) => null);
  return body;
};
