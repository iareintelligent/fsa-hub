const authFormReducerDefaultState = {
    confirmationRequired: false,
    confirmationCode: "",
    errors: [],
    showSignUpButton: true,
    signUpButtonText: "Create an account",
    isLoading: true,
    formAction: "signIn",
    disableUsernameInput: false,
    disableActionButton: false,
    showPasswordInput: true,
    showEmailInput: false,
    showConfirmPassword: false,
    showConfirmationInput: false,
    buttonContent: "Log in",
    buttonLoadingContent: "Logging in...",
    passwordLabel: "password"
};

export default (state = authFormReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_CONFIRMATION_CODE":
            return {
                ...state,
                confirmationCode: action.confirmationCode
            };
        case "SIGN_IN":
            return {
                ...state,
                showSignUpButton: true,
                signUpButtonText: "Create an account",
                isLoading: false,
                formAction: "signIn",
                disableUsernameInput: false,
                disableActionButton: true,
                showPasswordInput: true,
                showConfirmPassword: false,
                showConfirmationInput: false,
                showEmailInput: false,
                buttonContent: "Log in",
                buttonLoadingContent: "Logging in...",
                passwordLabel: "password"
            };
        case "SIGN_UP":
            return {
                ...state,
                signUpButtonText: "Cancel",
                formAction: "signUp",
                isLoading: false,
                disableUsernameInput: false,
                disableActionButton: true,
                showPasswordInput: true,
                showConfirmPassword: true,
                showConfirmationInput: false,
                showEmailInput: true,
                passwordLabel: "password",
                buttonContent: "Create an account",
                buttonLoadingContent: "Signing up..."
            };
        case "CONFIRM_SIGN_UP":
            return {
                ...state,
                confirmationRequired: true,
                showSignUpButton: true,
                signUpButtonText: "Cancel",
                isLoading: false,
                formAction: "confirmSignUp",
                disableUsernameInput: true,
                disableActionButton: false,
                showPasswordInput: true,
                showConfirmPassword: false,
                showConfirmationInput: true,
                showEmailInput: false
            };
        case "SIGN_IN_PASSWORD_ERROR":
            return {
                ...state,
                showSignUpButton: true,
                signUpButtonText: "Create an account",
                isLoading: false,
                formAction: "signInPasswordError",
                disableUsernameInput: false,
                showPasswordInput: true,
                showConfirmPassword: false,
                showConfirmationInput: false,
                showEmailInput: false,
                disableActionButton: true,
                buttonContent: action.err,
                buttonLoadingContent: "Sending confirmation code..."
            };
        case "FORGOT_PASSWORD":
            return {
                ...state,
                showSignUpButton: false,
                formAction: "forgotPassword",
                isLoading: false,
                disableUsernameInput: true,
                disableActionButton: false,
                showPasswordInput: true,
                showConfirmPassword: false,
                showConfirmationInput: true,
                showEmailInput: false,
                buttonContent: "Change your password",
                buttonLoadingText: "Bothering our engineers...",
                passwordLabel: "new password"
            };
        case "USER_NOT_FOUND":
            return {
                ...state,
                showSignUpButton: true,
                formAction: "userNotFound",
                disableUsernameInput: false,
                disableActionButton: true,
                showPasswordInput: true,
                showConfirmPassword: false,
                showConfirmationInput: false,
                showEmailInput: false,
                buttonContent: action.errorMessage,
                buttonLoadingText: "...",
                passwordLabel: "password"
            };
        default:
            return state;
    }
};
