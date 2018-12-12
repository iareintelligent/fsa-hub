import React, { Component } from "react";
// import sanity from '../lib/sanity'
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
import FolderContainers from "../components/FolderContainers";
import {
    fullStackApprenticeship,
    cityByCity,
    findingWork
} from "../directories";

// function TabContainer(props) {

//     return (
//         <Typography component="div" style={{ padding: 8 * 3 }}>
//             {props.children}
//         </Typography>
//     );
// }

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
});

// const query = `*[_type == 'algorithmsSchema' || _type == 'gitSchema' || _type == 'nativeSchema' || _type == 'webSchema' || _type == 'backEndSchema' || _type == 'commandLineSchema' || _type == 'javascriptSchema' || _type == 'gitSchema' || _type == 'awsSchema' || _type == 'securitySchema'  ]{_type, text, title, url}`;

class LinkTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            fsaFolders: [],
            cityFolders: [],
            workFolders: []
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    reduceFolder = folder =>
        folder.reduce(
            (acc, next) => acc.concat({ name: next.name, type: next.type }),
            []
        );

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="FSA Knowledge Base" />
                        <Tab label="City by City" />
                        <Tab label="Finding Work & Opportunity" />
                    </Tabs>
                </AppBar>
                {value === 0 && (
                    <FolderContainers
                        folders={fullStackApprenticeship.reduce(
                            (acc, next) =>
                                acc.concat({
                                    name: next.name,
                                    type: next.type
                                }),
                            []
                        )}
                    />
                )}
                {value === 1 && (
                    <FolderContainers
                        folders={cityByCity.reduce(
                            (acc, next) =>
                                acc.concat({
                                    name: next.name,
                                    type: next.type
                                }),
                            []
                        )}
                    />
                )}
                {value === 2 && (
                    <FolderContainers
                        folders={findingWork.reduce(
                            (acc, next) =>
                                acc.concat({
                                    name: next.name,
                                    type: next.type
                                }),
                            []
                        )}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(LinkTabs);
