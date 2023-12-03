import React, { useState } from 'react';
import hamburger from '../../../../assets/images/hamburger.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, logoutAction } from '../../../../store/root-reducer';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import useAuthentication from '../../../../services/authentication/AuthService';
import { useNavigate } from 'react-router-dom';

interface Props {
  sidebarToggle: boolean;
  setsidebarToggle: (state: boolean) => void;
}

const AppHeader = (props: Props) => {
  const { sidebarToggle, setsidebarToggle } = props;

  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();

  const navigate = useNavigate();

  const LogOutAction = () => {
    dispatch(logoutAction())
    navigate('/login');
    // window.location.reload();
  }

  // const userDetails = TokenService.getAccessToken();
  const userDetail = useSelector((state: RootState) => state?.userDetails)

  const togglesidebar = () => setsidebarToggle(!sidebarToggle);
  // console.log(sidebarToggle, "True");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);


  return (
    <>
      <header className='header'>
        <div className='d-flex justify-content-between align-items-center w-100'>
          <div className="d-flex align-items-center">
            <span className="toggler" onClick={togglesidebar}>
              <img src={hamburger} alt="hamburger" width="17" />
            </span>
          </div>
          <div className='list list__inline list-separator px-4'>
            <div className='header-username'>
              {isAuthenticated() && (
                <Dropdown isOpen={dropdownOpen} toggle={toggle} tag="div">
                  <DropdownToggle className="auth" tag="div" role="button">
                    <div className="textbox mr-2">
                      <h6 className="username font-bold">{userDetail.firstname}</h6>
                    </div>
                    <i className="ic-dropdown"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={LogOutAction} className="dropdown-item text-danger">
                      <i className="ic-logout"></i>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </header>

    </>
  )
}

export default AppHeader
