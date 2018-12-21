import React from "react";
import PaperTextField from "./PaperTextField";
import { connect } from "react-redux";
import { setPassword, setConfirmPassword } from "../actions/user";
import { toggleShowPassword } from "../actions/authForm";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

class PasswordInput extends React.Component {
    render() {
        console.log(this.props.showPassword);
        return (
            <PaperTextField
                renderField={
                    this.props.variant === "password"
                        ? this.props.showPasswordInput
                        : this.props.showConfirmPassword
                }
            >
                <FormControl fullWidth>
                    <InputLabel htmlFor="password">
                        {this.props.variant
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .toLowerCase()}
                    </InputLabel>
                    <Input
                        autoComplete="new-password"
                        fullWidth
                        id={this.props.variant}
                        type={!this.props.showPassword ? "password" : "text"}
                        onChange={this.handleChange}
                        value={this.props[this.props.variant]}
                        autoComplete="new-password"
                        endAdornment={
                            <InputAdornment position="end">
                                {this.props.variant === "password" ? (
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.props.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                ) : this.props.password.length > 0 &&
                                  this.props.password ===
                                      this.props.confirmPassword ? (
                                    <Done />
                                ) : (
                                    <Clear />
                                )}
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </PaperTextField>
        );
    }
    handleClickShowPassword = () => {
        this.props.dispatch(toggleShowPassword());
    };
    handleChange = event => {
        event.target.id === "password"
            ? this.props.dispatch(setPassword(event.target.value))
            : this.props.dispatch(setConfirmPassword(event.target.value));
    };
    confirmPassword = event => {};
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        password: state.user.password,
        confirmPassword: state.user.confirmPassword,
        showConfirmPassword: state.authForm.showConfirmPassword,
        showPasswordInput: state.authForm.showPasswordInput,
        showPassword: state.authForm.showPassword
    };
};

export default connect(mapStateToProps)(PasswordInput);
