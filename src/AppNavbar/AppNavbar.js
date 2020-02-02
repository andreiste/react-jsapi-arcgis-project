import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import logo from '../react-logo.svg';
import './AppNavbar.css';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar className="reactstrap-nav" dark expand='md'>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <NavbarBrand href="https://developers.arcgis.com/javascript/">
          <img
            src = {logo}
            alt=""
            width="40"
            height="40"
            className="react-logo"
          />
         {' '}
          Javascript API for ArcGIS</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              href="https://www.esri.ro/ro-ro/home">@esriro</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/andreiste/react-jsapi-arcgis-project.git">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}

export default AppNavbar;