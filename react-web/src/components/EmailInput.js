import React from "react";
import PaperTextField from "./PaperTextField";
import { connect } from "react-redux";
import { setEmail } from "../actions/user";
import { TextField } from "@material-ui/core";

class EmailInput extends React.Component {
    render() {
        console.log(this.props);
        return (
            <PaperTextField>
                <TextField
                    id="email"
                    label="email"
                    type="email"
                    onChange={this.handleChange}
                    value={this.props.email}
                    autoComplete="new-password"
                    disabled={this.props.disableUsernameInput}
                    fullWidth
                />
            </PaperTextField>
        );
    }
    handleChange = event => {
        this.props.dispatch(setEmail(event.target.value));
    };
}

const mapStateToProps = state => {
    console.log(state);
    return {
        email: state.user.email,
        disableUsernameInput: state.authForm.disableUsernameInput
    };
};

export default connect(mapStateToProps)(EmailInput);
