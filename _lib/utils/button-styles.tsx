import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean
) =>
  classNames(
    "flex bg-green border-green text-white font-medium text-center py-2 px-6 justify-center duration-300 border-4 rounded-[6px] min-w-[100px]",
    cssClasses,
    {
      "desktop:hover:bg-transparent desktop:hover:text-black":
        !disabled && !pending,
      "opacity-50 cursor-not-allowed hover:none": pending,
    }
  );
