import { createContext } from "react";

export const DocumentPageContext = createContext({
  document: null,
  collections: {},
  setDocument: (v) => {},
  setCollections: (v) => {},
  setCollection: (data, collectionName) => {},
});

// collections = {
//   courses: {
//     totalResults: n,
//     results: m,
//     docs: [...]
//   }
// }
