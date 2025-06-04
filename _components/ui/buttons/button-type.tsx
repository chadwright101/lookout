import { useFormStatus } from "react-dom";
import { ButtonProps } from "@/_types/button-types";
import { buttonStyles } from "@/_lib/utils/button-styles";

const ButtonType = ({
  children,
  onClick,
  cssClasses,
  colorWhite,
  type = "submit",
  disabled = false,
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles(colorWhite, cssClasses, disabled, pending)}
      disabled={disabled || pending}
    >
      {pending && type === "submit" ? (
        <div className="py-[1.5px]">
          <div className="spinner-submit"></div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default ButtonType;
