"use client";

import { DocumentPageContext } from "@/store/document-page-context";
import React, { useState } from "react";

const DocumentPageProvider = ({ children, documentDefault }) => {
  const [document, setDocument] = useState(documentDefault);

  const setDocumentHandler = (v) => setDocument(v);

  const documentPageContent = {
    document,
    setDocument: setDocumentHandler,
  };

  return <DocumentPageContext.Provider value={documentPageContent}>{children}</DocumentPageContext.Provider>;
};

export default DocumentPageProvider;
