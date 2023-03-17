import React from 'react';
import { useMapContextData, useMapContextActions, useMenuContextActions } from 'src/contexts';

export const GameDonePopup: React.FC = () => {
    const { showGameDonePopup, formattedTime } = useMapContextData();
    const { setMenuVisibility } = useMenuContextActions();
    const { playAgain } = useMapContextActions();

    if (showGameDonePopup) {
        return (
            <div className='fixed left-0 top-0 flex flex-col w-full h-full bg-black/0 z-50 select-none'>
                <div className='w-[50%] h-[50%] text-center static my-auto mx-auto shadow-xl'>
                    <div className='flex flex-col gap-4 w-full h-full bg-black/80 p-8 text-white rounded-xl drop-shadow-2xl'>
                        <div className='flex justify-center text-2xl font-bold'>
                            Great job!
                        </div>
                        <div className=''>
                            You guessed all countries!
                        </div>
                        <div className='flex justify-star'>
                            <div className='mr-2'>
                                Time taken:
                            </div>
                            <div className='font-bold'>
                                {formattedTime}
                            </div>
                        </div>
                        <div className='flex w-full mt-auto'>
                            <div className='w-1/3 border-green-500 border-2 rounded-xl px-4 py-2 text-slate-200
                                hover:cursor-pointer active:ring-green-700 active:ring-2 active:text-white'
                                onClick={(): void => playAgain()}
                            >
                                Play again!
                            </div>
                            <div className='ml-auto w-1/3 border-red-500 border-2 rounded-xl px-4 py-2 text-slate-200
                                hover:cursor-pointer active:ring-red-700 active:ring-2 active:text-white'
                                onClick={(): void => setMenuVisibility(true)}
                            >
                                Change region
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
        </>
    );
};
