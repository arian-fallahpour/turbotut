"use client";

import { forwardRef } from "react";
import classes from "./Button.module.scss";

import { join, toCap } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Button = forwardRef(
  (
    {
      isBackButton,
      isLink,
      isHashLink,
      isActive,
      isDisabled,
      isLoading,
      openNewTab,
      children,
      styleName,
      variantName,
      size = "normal",
      className,
      activeClassName,
      ...otherProps
    },
    ref
  ) => {
    const router = useRouter();

    // Add onFocus/onBlur if it doesn't exist mouseEnter/mouseLeave does
    if (otherProps.onMouseEnter && !otherProps.onFocus)
      otherProps.onFocus = otherProps.onMouseEnter;
    if (otherProps.onMouseLeave && !otherProps.onBlur)
      otherProps.onBlur = otherProps.onMouseLeave;

    // Determine className
    const styleClassName = classes["Button" + toCap(styleName || "")];
    const variantClassName =
      classes["Button" + toCap(styleName || "") + "--" + variantName];

    const buttonClassName = join(
      classes.Button,
      styleName ? styleClassName : null,
      variantName ? variantClassName : null,
      classes[`size-${size}`],
      className ? className : null,
      isLoading ? classes.loading : null,
      isDisabled ? classes.disabled : null,
      isActive ? classes.active : null
    );

    // Determine tag
    const Tag = isLink || isHashLink ? Link : "button";

    const onClickHandler = () => {
      if (otherProps.onClick) otherProps.onClick();
      if (isBackButton) router.back();
    };

    return (
      <Tag
        className={buttonClassName}
        href={otherProps.href}
        disabled={isDisabled}
        replace={isHashLink ? true : otherProps.replace}
        onClick={onClickHandler}
        {...otherProps}
        target={openNewTab ? "_blank" : undefined}
        ref={ref}
      >
        {["shiny", "circle"].includes(styleName) ? (
          <span className={classes.children}>{children}</span>
        ) : (
          children
        )}
        {isLoading && <span className={classes.loader} />}
      </Tag>
    );
  }
);
Button.displayName = "Button";

export default Button;
