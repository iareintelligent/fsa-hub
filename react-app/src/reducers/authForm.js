const authFormReducerDefaultState = {
    showSignUpButton: true,
    signUpButtonText: "Create an account",
    isLoading: false,
    formAction: "signIn",
    disableEmailInput: false,
    disableActionButton: false,
    showPasswordInput: true,
    showMatchingPasswordInput: false,
    showConfirmationInput: false,
    buttonContent: "Log in",
    buttonLoadingContent: "Logging in...",
    passwordLabel: "password"
};

export default (state = authFormReducerDefaultState, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                showSignUpButton: true,
                signUpButtonText: "Create an account",
                isLoading: false,
                formAction: "signIn",
                disableEmailInput: false,
                disableActionButton: false,
                showPasswordInput: true,
                showMatchingPasswordInput: false,
                showConfirmationInput: false,
                buttonContent: "Log in",
                buttonLoadingContent: "Logging in...",
                passwordLabel: "password"
            };
        case "SIGN_UP":
            return {
                showSignUpButton: true,
                signUpButtonText: "Cancel",
                formAction: "signUp",
                isLoading: false,
                disableEmailInput: false,
                disableActionButton: true,
                showPasswordInput: true,
                showMatchingPasswordInput: true,
                showConfirmationInput: false,
                passwordLabel: "password",
                buttonContent: "Create an account",
                buttonLoadingContent: "Signing up..."
            };
        case "CONFIRM_SIGN_UP":
            return {
                showSignUpButton: true,
                signUpButtonText: "Cancel",
                isLoading: false,
                formAction: "confirmSignUp",
                disableEmailInput: true,
                disableActionButton: false,
                showPasswordInput: true,
                showMatchingPasswordInput: false,
                showConfirmationInput: true
            };
        case "SIGN_IN_PASSWORD_ERROR":
            return {
                showSignUpButton: true,
                signUpButtonText: "Create an account",
                isLoading: false,
                formAction: "signInPasswordError",
                disableEmailInput: false,
                showPasswordInput: true,
                showMatchingPasswordInput: false,
                showConfirmationInput: false,
                disableActionButton: true,
                buttonContent: "",
                buttonLoadingContent: "Sending confirmation code..."
            };
        case "FORGOT_PASSWORD":
            return {
                showSignUpButton: false,
                formAction: "forgotPassword",
                isLoading: false,
                disableEmailInput: true,
                disableActionButton: false,
                showPasswordInput: true,
                showMatchingPasswordInput: false,
                showConfirmationInput: true,
                buttonContent: "Change your password",
                buttonLoadingText: "Bothering our engineers...",
                passwordLabel: "new password"
            };
        case "USER_NOT_FOUND":
            return {
                showSignUpButton: true,
                formAction: "userNotFound",
                isLoading: false,
                disableEmailInput: false,
                disableActionButton: true,
                showPasswordInput: true,
                showMatchingPasswordInput: false,
                showConfirmationInput: false,
                buttonContent: "User not found",
                buttonLoadingText: "...",
                passwordLabel: "password"
            };
        default:
            return state;
    }
};