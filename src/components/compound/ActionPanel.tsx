'use client';

import React from 'react';
import DirectionalButton from './DirectionalButton';
import MobileNavbarBtn from './MobileNavbarBtn';

interface ActionPanelType {
  setOpenMobileNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const ActionPanel: React.FC<ActionPanelType> = ({ setOpenMobileNavbar }) => {
  return (
    <div className="flex gap-3 items-center">
      <DirectionalButton label="Let's Talk" onClick={scrollToContact} />
      <MobileNavbarBtn setOpenMobileNavbar={setOpenMobileNavbar} />
    </div>
  );
};

export default ActionPanel;
