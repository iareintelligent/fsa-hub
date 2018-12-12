import React from 'react';
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


export default ({ folders }) => {

    const directories = folders.map((val, i) => {
        return (
            <Grid key={i} item xs={6} sm={3}>
                <Card className={styles.card}>
                    <CardContent>
                        <Typography className={styles.title} color="textSecondary" gutterBottom>
                            {val.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`/tool/${val.type}`} size="small">
                            View Content
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    })
    return (

        !folders
            ? "Loading"
            : directories

    );

}
