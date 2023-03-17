import React from 'react';
import { useMenuContextData, useMenuContextActions, useMapContextActions } from 'src/contexts';
import { africa, asia, europe, northAmerica, oceania, southAmerica, world } from 'src/assets';
import { BorderType } from 'src/types';
import { BaseMenu } from './BaseMenu';

export const Menu: React.FC = () => {
    const { menuVisibility } = useMenuContextData();
    const { setMenuVisibility } = useMenuContextActions();
    const { changeBorders } = useMapContextActions();

    const chooseMode = (borderType: BorderType): void => {
        changeBorders(borderType);
        setMenuVisibility(false);
    };

    if (!menuVisibility) return <div></div>;

    return (
        <BaseMenu>
            <div className='text-slate-200 h-full'>
                <div className='flex h-1/2'>
                    <div className='flex items-center justify-center cursor-pointer hover:text-white flex-col w-1/4'
                        onClick={(): void => chooseMode(BorderType.World)}
                    >
                        <img src={world} className='w-full mt-auto' />
                        <div className='mx-auto mt-auto mb-8'>World</div>
                    </div>
                    <div className='flex items-center justify-center cursor-pointer hover:text-white flex-col w-1/4'
                        onClick={(): void => chooseMode(BorderType.EuropeanUnion)}
                    >
                        <img src={europe} className='w-full my-auto' />
                        <div className='mx-auto mt-auto mb-8'>Europe</div>
                    </div>
                    <div className='flex items-center justify-center cursor-pointer hover:text-white flex-col w-1/4'>
                        <img src={asia} className='w-full my-auto' />
                        <div className='mx-auto mt-auto mb-8'>Asia</div>
                    </div>
                    <div className='flex items-center justify-center cursor-pointer hover:text-white flex-col w-1/4'>
                        <img src={northAmerica} className='w-full my-auto' />
                        <div className='mx-auto mt-auto mb-8'>North America</div>
                    </div>
                </div>
                <div className='flex flex-grow-[4] h-1/2'>
                    <div className='flex items-center justify-center cursor-pointer hover:text-white flex-col w-1/4'>
                        <img src={southAmerica} className='w-[70%] my-auto' />
                        <div className='mx-auto mt-auto mb-8'>South America</div>
                    </div>
                    <div className='flex items-center justify-center cursor-pointer hover:text-white flex-col w-1/4'>
                        <img src={africa} className='w-[70%] my-auto' />
                        <div className='mx-auto mt-auto mb-8'>Africa</div>
                    </div>
                    <div className='flex items-center justify-center cursor-pointer hover:text-white flex-col w-1/4'>
                        <img src={oceania} className='w-[70%] my-auto' />
                        <div className='mx-auto mt-auto mb-8'>Oceania</div>
                    </div>
                </div>
            </div>
        </BaseMenu>
    );

    return (
        <>

        </>
    );
};
