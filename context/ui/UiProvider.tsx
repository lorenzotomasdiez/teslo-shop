import { FC, ReactNode, useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState{
    isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false
}

interface Props{
    children?: ReactNode;
}
export const UiProvider:FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({type:'[Ui] - ToggleMenu'})
    }

    
    return (
        <UiContext.Provider value={{
            ...state,


            //Methods
            toggleSideMenu,
        }}>
            {children}
        </UiContext.Provider>
    )
}