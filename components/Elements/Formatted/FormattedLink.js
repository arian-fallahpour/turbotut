import React from "react";

import Button from "../Button/Button";

const FormattedLink = async () => {
  const reactDOMServer = (await import("react-dom/server")).default;

  return reactDOMServer.renderToString(
    <Button styleName="text" href="$2" isLink>
      $1
    </Button>
  );
};

export default FormattedLink;
