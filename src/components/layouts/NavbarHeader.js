import React from 'react';

const NavbarHeader = ({changeTheme, darkMode}) => {
  return (
    <>
      <div className={`header ${darkMode ? 'dark-theme' : ''}`}>
        <div className="header_logo">
          <h2>Where in the world?</h2>
        </div>
        <div className="header_switch_mode" onClick={changeTheme}>
          <i className="far fa-moon"></i>Dark Mode
        </div>
      </div>
    </>
  );
};

export default NavbarHeader;
