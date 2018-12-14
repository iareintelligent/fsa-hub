import React from "react";
import PaperTextField from "./PaperTextField";
import { connect } from "react-redux";
import { setUsername } from "../actions/user";
import { signInForm } from "../actions/authForm";

class UsernameInput extends React.Component {
    render() {
        return (
            <PaperTextField
                id="username"
                label="username"
                type="text"
                handleChange={this.handleChange}
                value={this.props.username}
                autoComplete="new-password"
                disabled={this.props.disableUsernameInput}
                fullWidth
            />
        );
    }
    handleChange = event => {
        this.props.dispatch(setUsername(event.target.value));

        switch (this.props.formAction) {
            case "userNotFound":
                event.target.id === "username" &&
                    this.props.dispatch(signInForm());
                break;
            default:
                break;
        }
    };
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        username: state.user.username,
        disableUsernameInput: state.authForm.disableUsernameInput,
        formAction: state.authForm.formAction
    };
};

export default connect(mapStateToProps)(UsernameInput);
