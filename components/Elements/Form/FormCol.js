import { join } from "@/utils/helper";
import classes from "./Form.module.scss";

const FormCol = ({ className, children, ...otherProps }) => {
  <div className={join(className, classes.FormCol)} {...otherProps}>
    {children}
  </div>;
};

export default FormCol;
