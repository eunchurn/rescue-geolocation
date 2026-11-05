import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { className = "", ...rest } = props;
  return <button className={`btn-secondary ${className}`} {...rest} />;
}
