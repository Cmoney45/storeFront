// client.src.Nav.index.js

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./style.css";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    backgroundColor: "#010b1c",
    borderRadius: "0px 50px",
    color: "white",
    paddingTop: "0.3em",
    paddingBottom: "0.3em"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navBar: {
    backgroundImage: "linear-gradient(45deg, #C3073F, #960731)",
    height: "6em"
  },
  icon: {
    fontSize: "48px"
  }
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'aclonica',
      'Unlock',
      'sans-serif'
    ].join(','),
  },
});

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };


  doSomething = (text) => {
    this.context.router.history.push('/' + text);
  };


  render() {
    const { classes } = this.props;
    // Add routes matching the object in the array to add more menu routes
    const mainRoutes = [
      {
        text: "Home",
        route: "",
        number: 1,
      },
    ]

    // Add routes matching the object in the array to add more profile routes
    const profileRoutes = [
      {
        text: (this.props.isAuth) ? "Profile" : "Register",
        route: (this.props.isAuth) ? "profile": "register",
        number: 1,
      },
      {
        text: (this.props.isAuth) ? "Logout" : "Login",
        route: (this.props.isAuth) ? "logout" : "login",
        number: 2,
      }
    ]


    const sideList = (
      <div className={classes.list}>
        <List>
          {mainRoutes.map(route => (
            <Link to={`/${route.route}`} key={route.number}>
              <ListItem button key={route.number}>
                <ListItemText primary={route.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {profileRoutes.map(route => (
            <Link to={`/${route.route}`} key={route.number}>
              <ListItem button key={route.number}>

                <ListItemText primary={route.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root} id="navBar">
            <AppBar position="static">
              <Toolbar className={classes.navBar}>
                <Button
                  color="inherit"
                  onClick={this.toggleDrawer("left", true)}
                >
                  Menu
                </Button>
                <Typography id="title" variant="h2" color="textPrimary" align="center" className={classes.grow}>
                  Your App's Title!
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
        </MuiThemeProvider>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps
)(withStyles(styles)(TemporaryDrawer));
