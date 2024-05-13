import { forwardRef } from "react";
import classes from "./Section.module.scss";

import { join } from "@/utils/helper";

const Section = forwardRef(
  ({ className, name, limit = "110rem", children, ...otherProps }, ref) => {
    const sectionClassName = join(classes.Section, className);
    const sectionName = name ? "section-" + name : undefined;

    return (
      <section
        className={sectionClassName}
        id={sectionName}
        ref={ref}
        style={{ maxWidth: limit ? limit : undefined }}
        {...otherProps}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
