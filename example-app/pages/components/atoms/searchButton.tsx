import "bootstrap/dist/css/bootstrap.css";
import { ButtonPropsType } from "../../utils/types";

const SearchButton = ({ id, className, caption, onClick }: ButtonPropsType) => {
  const attribute: ButtonPropsType = {
    id: id,
    className: `btn btn-primary ${className}`,
    caption: caption,
    onClick: onClick,
  };
  return <button {...attribute}>{caption}</button>;
};

export default SearchButton;
