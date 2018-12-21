import React from "react";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class PaperTextField extends React.Component {
    render() {
        const {
            classes,
            order = 0,
            renderField = true,
            type = "",
            disabled
        } = this.props;

        return (
            <Slide
                direction="right"
                in={renderField}
                mountOnEnter
                unmountOnExit
                style={{ transitionDelay: order ? order * 100 : 0 }}
            >
                <Paper elevation={disabled ? 0 : 4} className={classes.paper}>
                    {this.props.children}
                </Paper>
            </Slide>
        );
    }
}

PaperTextField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperTextField);
