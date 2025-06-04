import classNames from "classnames";

export const buttonStyles = (
  colorWhite?: boolean,
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean
) =>
  classNames(
    "flex subheading text-center py-1.5 px-4 justify-center duration-500 border-4 rounded-[6px] font-bold min-w-[100px]",
    cssClasses,
    {
      "desktop:hover:bg-transparent desktop:hover:text-black":
        !colorWhite && !disabled && !pending,
      "bg-white border-light-green": colorWhite,
      "bg-light-green border-light-green text-white": !colorWhite,
      "desktop:hover:bg-light-green desktop:hover:border-white desktop:hover:text-white":
        colorWhite && !disabled && !pending,
      "opacity-50 cursor-not-allowed hover:none": pending,
    }
  );
