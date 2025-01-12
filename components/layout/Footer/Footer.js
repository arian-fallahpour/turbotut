import React from "react";
import classes from "./Footer.module.scss";
import Button from "@/components/Elements/Button/Button";

import business from "@/app/data/business";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <ul className={classes.Links}>
        <li className={classes.Link}>
          <Button styleName="nav" href="/" isLink>
            home
          </Button>
        </li>
        <li className={classes.Link}>
          <Button styleName="nav" href="/courses" isLink>
            courses
          </Button>
        </li>
        <li className={classes.Link}>
          <Button styleName="nav" href="/#section-faq" isLink>
            faq
          </Button>
        </li>
        {/* <li className={classes.Link}>
          <Button styleName="nav" href="/legal" isLink>
            legal
          </Button>
        </li> */}
      </ul>
      <p className="paragraph">Support: email@example.com</p>
      <p className="paragraph">
        ©2024-{new Date(Date.now()).getFullYear()} {business.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
