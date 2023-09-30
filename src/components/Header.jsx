import React from 'react';
import Home from '../images/iCON 7 1.png'
import setting from '../images/settings.png';
import close from '../images/close-circle.png';

const Header = () => {
  return (
    <div style={{ alignSelf: 'stretch', height: 76, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 16, display: 'flex' }}>
        {/* Logo and App Name */}
        <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
          <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
            <div style={{ width: 28, height: 28, position: 'relative' }}>
              <img style={{ width: 28, height: 28.01, left: -0, top: -0.12, position: 'absolute' }} src={Home} alt='home' />
            </div>
            <div style={{ color: '#120B48', fontSize: 16, fontFamily: 'Sora', fontWeight: '700', wordWrap: 'break-word' }}>HelpMeOut</div>
          </div>
          <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'flex' }}>
            <img src={setting} alt='home' />
            <img src={close} alt='home' />
          </div>
        </div>
        {/* App Description */}
        <div style={{ width: 225, color: '#413C6D', fontSize: 14, fontFamily: 'Work Sans', fontWeight: '400', wordWrap: 'break-word' }}>
          This extension helps you record and share help videos with ease.
        </div>
      </div>

  );
};

export default Header;
