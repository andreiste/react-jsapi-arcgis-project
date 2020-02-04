import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
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
      <NavbarBrand>
          <img
            src = {logo}
            alt=""
            width="40"
            height="40"
            className="react-logo"
          />
         {' '} Traficul din București
      </NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <UncontrolledDropdown>
          <DropdownToggle caret outline color="secondary">
              Documentație
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="https://developers.arcgis.com/javascript/">
              Javascript API for ArcGIS
            </DropdownItem>
            <DropdownItem href="https://www.arcgis.com/home/item.html?id=ff11eb5b930b4fabba15c47feb130de4">
              World Traffic Service
            </DropdownItem>
            <DropdownItem href="https://reactjs.org/docs/getting-started.html">
              React
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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