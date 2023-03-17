import React from 'react';
import { useMenuContextActions } from 'src/contexts';
import { IoCloseOutline } from 'react-icons/io5';

interface IProps {
    children: JSX.Element;
}

export const BaseMenu: React.FC<IProps> = ({ children }) => {
    const { setMenuVisibility } = useMenuContextActions();

    return (
    <div className='fixed left-0 top-0 flex flex-col w-full h-full bg-slate-700/95 z-50 select-none'>
        <div className='static my-auto mx-auto w-full h-full'>
            <IoCloseOutline
                className='absolute right-4 top-4 text-slate-200 text-2xl cursor-pointer hover:text-white z-50'
                onClick={(): void => setMenuVisibility(false)}
            />
            {children}
        </div>
    </div>
    );
};
