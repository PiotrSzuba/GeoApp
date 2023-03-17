import React, { useState, useEffect } from 'react';
import { useMapContextData } from 'src/contexts';

export const CountryGuessedPopup: React.FC = () => {
    const { showGameMessagePopup } = useMapContextData();
    const [popups, setPopups] = useState<boolean[]>([]);

    const baseClass = 'duration-500 transition-all';
    const fullOpacity = baseClass + 'opacity-100';
    const noOpacity = baseClass + 'opacity-0';

    useEffect(() => {
        if (!showGameMessagePopup) return;
        console.log('Should show new');
        const newPopups = [...popups];
        const unusedPopupIndex = newPopups.findIndex((x) => !x);
        console.log(newPopups);
        if (unusedPopupIndex === -1) {
            newPopups.push(false);
        }
        newPopups[unusedPopupIndex] = true;
        setPopups(newPopups);

        setTimeout(() => {
            const oldPopups = [...popups];
            oldPopups[unusedPopupIndex] = false;
            console.log('deleted', unusedPopupIndex);
            setPopups(oldPopups);
        }, 10000);

        (): void => setPopups([]);
    }, [showGameMessagePopup]);

    return (
        <div className='fixed flex-col h-full bg-transparent z-20 right-2 pt-16'>
            {popups.map((val, idx) =>
            <div className={val ? fullOpacity : noOpacity} key={`country_guessed_popup_${idx}`}>
                <div
                    className='bg-black border-2 border-green-500 px-8 py-4 rounded-xl shadow-2xl flex z-20 h-fit my-2'
                >
                    <div className='my-auto text-white'>
                        Good job !
                    </div>
                </div>
            </div>
            )}
        </div>
    );

    return (
        <>
        </>
    );
};
