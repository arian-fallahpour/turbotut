export const CLIENT_ENV = "development";

export const BASE_URL_DEV = "http://localhost:3000";
export const BASE_URL_PROD = "http://localhost:3000";
export const BASE_URL =
  CLIENT_ENV === "development" ? BASE_URL_DEV : BASE_URL_PROD;

export const STRIPE_PUBLIC_KEY =
  "pk_test_51PEYEaErmmehb3yOgtCJLNTQOk7y8Ibb9cLYGAS9UpxqdBwjK9bUrkrDj099ceka1EfkdP4ozlj5DvEuz7NsX4Tc00Rz28tJIC";
