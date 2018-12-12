import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import PaperTextField from "../components/PaperTextField";
import LoadingButton from "../components/LoadingButton";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

import RootRef from "@material-ui/core/RootRef";
import { connect } from "react-redux";
import { signInForm, signUpForm } from "../actions/authForm";

const styles = theme => ({
    login: {
        padding: "20px 20px 60px"
    },
    loginForm: {
        margin: "0 auto",
        maxWidth: "320px",
        textAlign: "center"
    },
    button: {
        marginBottom: theme.spacing.unit * 2
    }
});

class AccountContainer extends React.Component {
    confirmationCodeInput = (order = 0) => (
        <React.Fragment>
            <PaperTextField
                id="confirmationCode"
                label="confirmation code"
                type="text"
                order={order}
                handleChange={this.handleChange}
                renderField={this.props.authForm.showConfirmationInput}
                value={this.props.confirmationCode}
                fullWidth
            />
            {this.renderFormActionButton({
                order: 0,
                buttonContent: "Resend confirmation code",
                buttonLoadingContent: "Resending confirmation code...",
                disabled: this.props.disableActionButton,
                type: "button",
                renderField:
                    this.props.showConfirmationInput &&
                    this.props.confirmationCode.length === 0,
                onClick: this.pickResendConfirmationType
            })}
        </React.Fragment>
    );

    renderFormActionButton = ({
        order = 0,
        color = "primary",
        disabled = false,
        buttonContent = this.props.buttonContent,
        buttonLoadingContent = this.props.buttonLoadingContent,
        renderField = true,
        ...props
    }) => {
        const delay = parseInt(order) * 100;
        const { classes } = this.props;
        return (
            <Slide
                direction="right"
                mountOnEnter
                unmountOnExit
                in={renderField}
                style={{ transitionDelay: delay }}
            >
                <LoadingButton
                    isLoading={this.props.isLoading}
                    text={buttonContent}
                    loadingText={buttonLoadingContent}
                    color={color}
                    disabled={disabled}
                    className={classes.button}
                    {...props}
                />
            </Slide>
        );
    };

    pickResendConfirmationType = () => {
        switch (this.props.formAction) {
            case "confirmSignUp":
                this.handleResendSignUpVerification();
                break;
            case "forgotPassword":
                this.forgotPassword();
                break;
            default:
                break;
        }
    };

    handleSignIn = async event => {
        try {
            await Auth.signIn(this.props.email, this.props.password).then(
                user => {
                    const token = user.signInUserSession.idToken;
                    this.props.loginUser(token);
                    this.props.history.push("/");
                }
            );
        } catch (error) {
            console.log(error);
            switch (error.code) {
                case "NotAuthorizedException":
                    this.setSignInPasswordErrorState(error.message);
                    break;
                case "UserNotFoundException":
                    this.setUserNotFoundState(error.message);
                    break;
                case "UserNotConfirmedException":
                    this.setConfirmSignUpState();
                    break;
                default:
            }
        }
    };

    handleResetPassword = async event => {
        try {
            await Auth.forgotPassword(this.props.email);
            this.setState({ password: "" });
            this.setForgotPasswordState();
        } catch (e) {
            this.setState({ buttonContent: e.message });
        }
    };

    handleSubmitNewPassword = async event => {
        try {
            Auth.forgotPasswordSubmit(
                this.props.email,
                this.props.confirmationCode,
                this.props.password
            )
                .then(data => {
                    this.handleSignIn();
                })
                .catch(err => {
                    this.setState({
                        buttonContent: err.message,
                        isLoading: false
                    });
                });
        } catch (e) {
            // this.setState({ buttonContent: e.message });
        }
    };

    handleSignUp = async event => {
        try {
            const newUser = await Auth.signUp({
                username: this.props.email,
                password: this.props.password,
                attributes: {
                    email: this.props.email
                }
            });
            this.setState({ newUser });
            this.setConfirmSignUpState();
        } catch (e) {
            this.setState({
                formAction: "signUpPasswordFail",
                isLoading: false,
                buttonContent: e.message
            });
        }
    };

    handleConfirmSignUp = async event => {
        this.setState({ isLoading: true });
        try {
            await Auth.confirmSignUp(
                this.props.email,
                this.props.confirmationCode
            );
            await Auth.signIn(this.props.email, this.props.password).then(
                data => {
                    this.setState({
                        username: data.user.username,
                        confirmationRequired: true,
                        isLoading: false
                    });
                    this.props.history.push("/");
                }
            );
        } catch (e) {
            this.setState({ buttonContent: e.message });
            this.setState({ isLoading: false });
        }
    };

    handleFormSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        switch (this.props.formAction) {
            case "signIn":
                this.handleSignIn(event);
                break;
            case "signInPasswordError":
                //only clickable button = "reset password"
                this.handleResetPassword(event);
                break;
            case "forgotPassword":
                //action button = "reset password"; requires: confirmation code and password.
                this.handleSubmitNewPassword(event);
                break;
            case "signUp":
                this.handleSignUp();
                break;
            case "confirmSignUp":
                this.handleConfirmSignUp();
                break;
            default:
        }
    };

    validateSignupForm() {
        return (
            this.props.email.length > 0 &&
            this.props.password.length > 5 &&
            this.props.password === this.props.confirmPassword
        );
    }
    validateSignInForm() {
        return this.props.email.length > 0 && this.props.password.length > 5;
    }

    validateConfirmationForm() {
        return this.props.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

        this.props.formAction === "userNotFound" &&
            event.target.id === "email" &&
            this.setSignInState();

        this.props.formAction === "signUpPasswordFail" && this.setSignUpState();
    };

    forgotPassword = async event => {
        this.setState({ isLoading: true });
        try {
            await Auth.forgotPassword(this.props.email);
        } catch (e) {
            this.everythingsEffed(this.props.formAction, e.message);
        }
        this.setState({ isLoading: false });
    };

    handleResendSignUpVerification = async event => {
        this.setState({
            isLoading: true
        });
        try {
            await Auth.resendSignUp(this.props.email)
                .then(event => {
                    console.log(event);
                })
                .catch(err => console.log(err));
            this.setState({
                isLoading: false
            });
        } catch (error) {
            alert(error.message);
            this.setState({
                isLoading: false
            });
        }
    };

    handleSignUpButton = () => {
        switch (this.props.formAction) {
            case "signIn":
            case "signInPasswordError":
            case "userNotFound":
                this.props.dispatch(signUpForm());
                break;

            default:
                this.props.dispatch(signInForm());
        }
    };

    handleDisableActionButton() {
        switch (this.props.formAction) {
            case "signUp":
                return !this.validateSignupForm();
            case "signIn":
                return !this.validateSignInForm();
            default:
                return this.props.disableActionButton;
        }
    }

    componentDidMount() {
        this.props.dispatch(signInForm());
    }

    render() {
        const { classes } = this.props;
        console.log(this.handleDisableActionButton());
        return (
            <div className={classes.login}>
                <form
                    className={classes.loginForm}
                    onSubmit={this.handleFormSubmit}
                >
                    <EmailInput />
                    <PasswordInput variant="password" />
                    <PasswordInput variant="confirmPassword" />
                    {this.props.formAction === "signInPasswordError" &&
                        this.renderFormActionButton({
                            order: 0,
                            buttonContent: "Reset Password",
                            buttonLoadingContent: "Bothering our engineers...",
                            color: "secondary",
                            disabled: false,
                            type: "submit"
                        })}
                    {this.confirmationCodeInput()}
                    {this.renderFormActionButton({
                        color: "default",
                        buttonContent: this.props.buttonContent,
                        disabled: this.handleDisableActionButton(),
                        variant: "contained"
                    })}
                    {this.props.showSignUpButton && (
                        <Button
                            color={
                                !this.props.disabledActionButton
                                    ? "primary"
                                    : "secondary"
                            }
                            type="button"
                            onClick={this.handleSignUpButton}
                        >
                            {this.props.signUpButtonText || "Error"}
                        </Button>
                    )}
                </form>
            </div>
        );
    }
}

AccountContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.user,
        auth: state.auth,
        authForm: state.authForm
    };
};

export default connect(mapStateToProps)(withStyles(styles)(AccountContainer));
