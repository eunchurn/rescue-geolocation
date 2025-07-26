import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  const { className = '', ...rest } = props;
  return <button className={`btn-secondary ${className}`} {...rest} />;
}