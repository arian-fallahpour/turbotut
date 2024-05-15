import { join } from "@/utils/helper";
import classes from "./Form.module.scss";

const FormRow = ({ className, children, ...otherProps }) => {
  <div className={join(className, classes.FormRow)} {...otherProps}>
    {children}
  </div>;
};

export default FormRow;
