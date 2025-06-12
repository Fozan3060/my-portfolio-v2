import React from 'react';
import DirectionalButton from './DirectionalButton';
import MobileNavbarBtn from './MobileNavbarBtn';

interface ActionPanelType {
  setOpenMobileNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionPanel:React.FC<ActionPanelType> = ({ setOpenMobileNavbar }) => {
  return (
    <div className="flex gap-3 items-center">
      <DirectionalButton />
      <MobileNavbarBtn setOpenMobileNavbar={setOpenMobileNavbar}/>
    </div>
  );
};

export default ActionPanel;
