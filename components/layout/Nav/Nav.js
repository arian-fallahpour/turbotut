"use client";

import React, { useEffect, useState } from "react";
import classes from "./Nav.module.scss";
import { join } from "@/utils/helper";

import Button from "@/components/Elements/Button/Button";
import NavProfile from "./NavProfile/NavProfile";
import Image from "next/image";
import MenuIcon from "@/components/Elements/Icons/MenuIcon";

import business from "@/app/data/business";
import { usePathname } from "next/navigation";

const Nav = ({ user, isAbsolute }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const onExpandHandler = () => setIsExpanded((p) => !p);

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "auto";
  }, [isExpanded]);

  return (
    <nav className={join(classes.Nav, isAbsolute ? classes.absolute : null, isExpanded ? classes.expanded : null)}>
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
            aria-label="open nav menu"
          >
            <MenuIcon />
          </Button>
        </div>
      </div>

      <span className={classes.NavBackdrop} onClick={() => setIsExpanded(false)} />

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
