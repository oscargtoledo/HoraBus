import React from 'react';

const PreferencesContext = React.createContext();

export const withPreferences = WrappedComponent => {
  return () => {
    const context = useContext(PreferencesContext);
    return <WrappedComponent {...context} />;
  };
};

export default PreferencesContext;
