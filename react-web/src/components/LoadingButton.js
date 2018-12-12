import React from "react";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import "./styles/LoadingButton.css";

export default ({
    isLoading = false,
    text,
    loadingText,
    disabled = false,
    variant = "text",
    type = "button",
    ...props
}) => {
    const isDisabled = disabled || isLoading;
    return (
        <Button
            type={type}
            variant={variant}
            fullWidth
            className="LoadingButton"
            disabled={isDisabled ? true : false}
            {...props}
        >
            {isLoading && !disabled && <AutorenewIcon className="loading" />}
            {!isLoading ? text : loadingText}
        </Button>
    );
};
