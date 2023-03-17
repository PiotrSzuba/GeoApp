import React from 'react';
import { MenuContextProvider, MapContextProvider } from 'src/contexts';

interface IProps {
    children: JSX.Element;
}

export const GlobalContext: React.FC<IProps> = ({ children }) => (
    <MapContextProvider>
        <MenuContextProvider>
            {children}
        </MenuContextProvider>
    </MapContextProvider>
    );
