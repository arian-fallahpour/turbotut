import React from "react";

import classes from "./Nav.module.scss";
import Button from "@/components/Elements/Button/Button";
import NavProfile from "./NavProfile/NavProfile";

import business from "@/app/data/business";
import Image from "next/image";
import { join } from "@/utils/helper";

const Nav = ({ user, isAbsolute }) => {
  return (
    <nav className={join(classes.Nav, isAbsolute ? classes.absolute : null)}>
      <div className={classes.NavLogo}>
        <Image src="/logo.png" alt={`${business.name} logo`} fill />
      </div>
      <div className={classes.NavTitle}>{business.name}</div>
      <ul className={classes.NavList}>
        <li className={classes.NavListItem}>
          <Button styleName="nav" href="/" isLink>
            Home
          </Button>
        </li>
        <li className={classes.NavListItem}>
          <Button styleName="nav" variantName="orange" href="/courses" isLink>
            Courses
          </Button>
        </li>
        <li className={classes.NavListItem}>
          <Button styleName="nav" href="/#section-faq" isLink>
            FAQ
          </Button>
        </li>
        <li className={classes.NavListItem}>
          <Button styleName="nav" href="/pricing" isLink>
            pricing
          </Button>
        </li>
        {user?.role === "admin" && (
          <li className={classes.NavListItem}>
            <Button styleName="nav" href="/dashboard" isLink>
              dashboard
            </Button>
          </li>
        )}
      </ul>
      <div className={classes.NavProfile}>
        <NavProfile user={user} />
      </div>
    </nav>
  );
};

export default Nav;
