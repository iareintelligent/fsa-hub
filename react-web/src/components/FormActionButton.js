import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LoadingButton from "./LoadingButton";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class FormActionButton extends React.Component {
    render() {
        const {
            classes,
            authForm,
            disabled = false,
            text,
            loadingText
        } = this.props;
        return (
            <Slide direction="right" mountOnEnter unmountOnExit in={true}>
                <LoadingButton
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    text={text}
                    loadingText={loadingText}
                    isLoading={this.props.isLoading}
                    disabled={disabled}
                />
            </Slide>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading
});

FormActionButton.propTypes = () => ({
    classes: PropTypes.object.isRequired
});

export default connect(mapStateToProps)(withStyles(styles)(FormActionButton));
