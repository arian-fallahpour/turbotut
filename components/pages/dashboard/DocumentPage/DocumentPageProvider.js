"use client";

import { DocumentPageContext } from "@/store/document-page-context";
import React, { useCallback, useState } from "react";

const DocumentPageProvider = ({ children, documentDefault }) => {
  const [document, setDocument] = useState(documentDefault);
  const [collections, setCollections] = useState({});

  const setDocumentHandler = (v) => setDocument(v);
  const setCollectionsHandler = (v) => setCollections(v);
  const setCollectionHandler = useCallback(
    (data, collectionName) =>
      setCollections((p) => ({ ...p, [collectionName]: data })),
    []
  );

  const documentPageContent = {
    document,
    collections,
    setDocument: setDocumentHandler,
    setCollections: setCollectionsHandler,
    setCollection: setCollectionHandler,
  };

  return (
    <DocumentPageContext.Provider value={documentPageContent}>
      {children}
    </DocumentPageContext.Provider>
  );
};

export default DocumentPageProvider;
