import React from 'react';
import { AppProvider } from "./contexts/AppContext";
import NavbarSection from './components/nav-section/NavbarSection';
import OptionPanel from './components/body-section/OptionPanel';

/**@info Main component of the Dapp, the entire project is born from this component */

function App(){

  return (
    <AppProvider>
      <NavbarSection/>
      <OptionPanel/>
    </AppProvider>
  );
}

export default App;
