import { buttonStyles } from "@/_lib/utils/button-styles";
import { ButtonProps } from "@/_types/button-types";
import Link from "next/link";

const ButtonLink = ({
  children,
  onClick,
  cssClasses,
  colorWhite,
  href = "#",
  disabled,
  ariaLabel,
}: ButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={buttonStyles(colorWhite, cssClasses, disabled)}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
