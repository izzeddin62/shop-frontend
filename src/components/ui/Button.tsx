import { AriaButtonProps, useButton } from "react-aria";
import { ReactNode, useRef } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
}

export default function Button(props: AriaButtonProps & ButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}
