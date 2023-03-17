import React, { useState, createContext, useContext } from 'react';

interface IProps {
    children: JSX.Element;
}

export interface IMenuContextData {
    menuVisibility: boolean;
    countriesClicked: string[];
}

export interface IMenuContextActions {
    setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    setCountriesClicked: React.Dispatch<React.SetStateAction<string[]>>;
}

const MenuContextData = createContext({} as IMenuContextData);
const MenuContextActions = createContext({} as IMenuContextActions);

export const useMenuContextData: ()=> IMenuContextData = () => useContext(MenuContextData);
export const useMenuContextActions: ()=> IMenuContextActions = () => useContext(MenuContextActions);

export const MenuContextProvider: React.FC<IProps> = ({ children }) => {
    const [menuVisibility, setMenuVisibility] = useState<boolean>(true);
    const [countriesClicked, setCountriesClicked] = useState<string[]>([]);

    return (
        <MenuContextData.Provider value={{ menuVisibility, countriesClicked }}>
            <MenuContextActions.Provider value={{ setMenuVisibility, setCountriesClicked }}>
                {children}
            </MenuContextActions.Provider>
        </MenuContextData.Provider>
    );
};
