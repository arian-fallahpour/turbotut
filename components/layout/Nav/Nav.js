"use client";

import React, { useState } from "react";
import classes from "./Nav.module.scss";
import { join } from "@/utils/helper";

import Button from "@/components/Elements/Button/Button";
import NavProfile from "./NavProfile/NavProfile";
import Image from "next/image";
import MenuIcon from "@/components/Elements/Icons/MenuIcon";

import business from "@/app/data/business";

const Nav = ({ user, isAbsolute }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onExpandHandler = () => setIsExpanded((p) => !p);

  return (
    <nav
      className={join(
        classes.Nav,
        isAbsolute ? classes.absolute : null,
        isExpanded ? classes.expanded : null
      )}
    >
      <div className={classes.NavHeader}>
        <div className={classes.NavLogo}>
          <div className={classes.NavLogoImage}>
            <Image src="/logo.png" alt={`${business.name} logo`} fill />
          </div>
        </div>
        <div className={classes.NavTitle}>{business.name}</div>
        <div className={classes.NavExpand}>
          <Button
            styleName="transparent"
            variantName="white"
            size="large"
            onClick={onExpandHandler}
          >
            <MenuIcon />
          </Button>
        </div>
      </div>

      <div className={classes.NavLinks}>
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
      </div>
    </nav>
  );
};

export default Nav;
