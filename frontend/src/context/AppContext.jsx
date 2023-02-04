import { useState, useContext, createContext } from "react";
export const ButtonContext = createContext();
const AppContext = ({ children }) => {
  const [state, setState] = useState({
    isClickHambergerBtn: false,
    isClickAddFolderModal: false,
    isClickAddNoteBtn: false,
    isLoading: false,
    isClickSideBarItem: false,
    isReset: false,
    isIdFolder: "",
  });
  const ButtonState = {
    state,
    setState,
  };
  //   console.log(ButtonState.state);
  return (
    <ButtonContext.Provider value={ButtonState}>
      {children}
    </ButtonContext.Provider>
  );
};
export default AppContext;
