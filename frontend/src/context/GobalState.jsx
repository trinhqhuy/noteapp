import { useReducer, createContext } from "react";

const initialState = {
  isHamberger: false,
  isAddFolderModal: false,
  isUpdateFolderModal: false,
  isAddNoteModal: false,
  isLoading: false,
  isSideBarItem: false,
  isRightSideBar: false,
  isReset: false,
  isShowMoreNote: false,
  fade: true,
  setNote: null,
  isFolder: null,
  isToast: false,
  isSearchMember: false,
  isSearchedMember: null,
  resSearch: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "isHamberger":
      return { ...state, isHamberger: !state.isHamberger };
    case "isAddFolderModal":
      return { ...state, isAddFolderModal: action.payload };
    case "isUpdateFolderModal":
      return { ...state, isUpdateFolderModal: action.payload };
    case "isAddNoteModal":
      return { ...state, isAddNoteModal: action.payload };
    case "isLoading":
      return { ...state, isLoading: !state.isLoading };
    case "isSideBarItem":
      return { ...state, isSideBarItem: action.payload };
    case "isRightSideBar":
      return { ...state, isRightSideBar: action.payload };
    case "isShowMoreNote":
      return { ...state, isShowMoreNote: action.payload };
    case "isReset":
      return { ...state, isReset: !state.isReset };
    case "fade":
      return { ...state, fade: !state.fade };
    case "setNote":
      return { ...state, setNote: action.payload };
    case "isFolder":
      return { ...state, isFolder: action.payload };
    case "isToast":
      return { ...state, isToast: action.payload };
    case "isSearchMember":
      return { ...state, isSearchMember: action.payload };
    case "isSearchedMember":
      return { ...state, isSearchedMember: action.payload };
    case "resSearch":
      return { ...state, resSearch: action.payload };
    default:
      throw new Error("Error 404 !");
  }
};
export const Store = createContext();
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
