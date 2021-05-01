import React from 'react';
import { withRouter } from 'react-router';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
  margin: {
    marginTop: theme.spacing(5),
  },
  buttonBack: {
    width: 140,
  },
}));

const NotFound = ({ history }) => {
  const classes = useStyles();

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='center'>
      <Button
        variant='outlined'
        size='medium'
        color='secondary'
        className={classes.buttonBack}
        startIcon={<ArrowBackOutlinedIcon />}
        onClick={() => {
          history.goBack();
        }}>
        Go Back
      </Button>
      <Container maxWidth='md' className={classes.margin}>
        <Typography align='center' color='textPrimary' variant='h3'>
          404: The page you are looking for isn’t here
        </Typography>
        <Typography align='center' color='textPrimary' variant='subtitle2'>
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation or go back
        </Typography>
        <Box textAlign='center'>
          <img
            alt='Under development'
            className={classes.image}
            src='https://react-material-dashboard.devias.io/static/images/undraw_page_not_found_su7k.svg'
          />
        </Box>
      </Container>
    </Box>
  );
};

export default withRouter(NotFound);
