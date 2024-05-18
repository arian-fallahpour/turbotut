import { forwardRef } from "react";
import classes from "./Button.module.scss";

import { join, toCap } from "@/utils/helper";
import Link from "next/link";

const Button = forwardRef(
  (
    {
      isLink,
      isHashLink,
      isActive,
      isDisabled,
      isLoading,
      children,
      styleName,
      variantName,
      className,
      activeClassName,
      ...otherProps
    },
    ref
  ) => {
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
      className ? className : null,
      isLoading ? classes.loading : null,
      isDisabled ? classes.disabled : null,
      isActive ? classes.active : null
    );

    // Determine tag
    const Tag = isLink || isHashLink ? Link : "button";

    return (
      <Tag
        className={buttonClassName}
        href={otherProps.href}
        disabled={isDisabled}
        replace={isHashLink ? true : otherProps.replace}
        {...otherProps}
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
