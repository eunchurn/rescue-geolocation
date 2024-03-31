import React from "react";

export const useSnackbar = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  }, [isActive]);

  const openSnackBar = (msg: string) => {
    setMessage(msg);
    setIsActive(true);
  };

  return { isActive, message, openSnackBar };
};
