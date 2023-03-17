import React from 'react';
import { MapContainer } from 'src/components/arcgis';
import { IoMenu } from 'react-icons/io5';
import { useMenuContextData, useMenuContextActions, useMapContextData } from 'src/contexts';

export const HomePage: React.FC = () => {
    const { menuVisibility } = useMenuContextData();
    const { setMenuVisibility } = useMenuContextActions();
    const { gameData, formattedTime } = useMapContextData();

    return (
    <div className='w-screen overflow-hidden'>
        {!menuVisibility &&
            <div className='absolute mt-4 right-4 text-2xl cursor-pointer text-slate-200 hover:text-white z-50'>
                <IoMenu onClick={(): void => setMenuVisibility(true)}/>
            </div>
        }
        {gameData.gameState === 'inProgress' &&
        <>
            <div className='absolute top-4 left-[40%] bg-black/75 rounded-2xl'>
                <div className='text-white mx-12 my-4 flex'>
                    Country to guess:
                    <div className='font-bold ml-2'>
                        {gameData.guessCountry}
                    </div>
                    <div className='ml-2'>
                        {gameData.countriesDone.length}/{gameData.countriesLeft.length + gameData.countriesDone.length}
                    </div>
                </div>
            </div>
            <div className='absolute w-[100px] bottom-0 right-0 text-white bg-black/75 px-4 py-2 rounded-l-xl text-lg flex'>
                <div className='mx-auto my-auto'>
                    {formattedTime}
                </div>
            </div>
        </>
        }
        <MapContainer />
    </div>
    );
};
