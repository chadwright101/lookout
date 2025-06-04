import classNames from "classnames";

interface LogoProps {
  smallVersion?: boolean;
  centerText?: boolean;
  rightText?: boolean;
  heading4?: boolean;
}

const LogoComponent = ({
  smallVersion,
  centerText,
  rightText,
  heading4,
}: LogoProps) => {
  if (!heading4) {
    return (
      <h1
        className={classNames("font-extralight grid", {
          "text-paragraph": !smallVersion,
          "text-[14px]": smallVersion,
          "place-items-center": centerText,
        })}
      >
        <span
          className={classNames(
            " font-normal uppercase border-b-2 border-green",
            {
              "text-[24px] leading-[32px]": !smallVersion,
              "text-[18px] leading-[28px]": smallVersion,
            }
          )}
        >
          Lookout Centre
        </span>
        Plettenberg Bay
      </h1>
    );
  } else {
    return (
      <h4
        className={classNames("font-extralight grid", {
          "text-paragraph": !smallVersion,
          "text-[14px]": smallVersion,
          "place-items-center": centerText,
          "place-items-end": rightText,
        })}
      >
        <span
          className={classNames(
            " font-normal uppercase border-b-2 border-green",
            {
              "text-[24px] leading-[32px]": !smallVersion,
              "text-[18px] leading-[28px]": smallVersion,
            }
          )}
        >
          Lookout Centre
        </span>
        Plettenberg Bay
      </h4>
    );
  }
};

export default LogoComponent;
