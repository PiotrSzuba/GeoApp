import React, { useState, createContext, useContext, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Graphic from '@arcgis/core/Graphic';
import { allBorders, europeanUnion } from 'src/borders';
import { BorderType, IGeoData, IGameData } from 'src/types';

interface IProps {
    children: JSX.Element;
}

export interface IMapContextData {
    mapView: MapView | null;
    gameData: IGameData;
    showGameMessagePopup: boolean;
    showGameDonePopup: boolean;
    formattedTime: string;
}

export interface IMapContextActions {
    setMapView: React.Dispatch<React.SetStateAction<MapView | null>>;
    changeBorders: (borderType: BorderType)=> void;
    onCountryClicked: (country: string)=> void;
    setShowGameMessagePopup: React.Dispatch<React.SetStateAction<boolean>>;
    playAgain: ()=> void;
}

const MapContextData = createContext({} as IMapContextData);
const MapContextActions = createContext({} as IMapContextActions);

export const useMapContextData: ()=> IMapContextData = () => useContext(MapContextData);
export const useMapContextActions: ()=> IMapContextActions = () => useContext(MapContextActions);

export const MapContextProvider: React.FC<IProps> = ({ children }) => {
    const defaultGameData: IGameData = { countriesLeft: [], countriesDone: [], guessCountry: '', time: 0, gameState: 'notStarted' };

    const [mapView, setMapView] = useState<MapView | null>(null);
    const [gameData, setGameData] = useState<IGameData>(defaultGameData);
    const [showGameMessagePopup, setShowGameMessagePopup] = useState<boolean>(false);
    const [showGameDonePopup, setShowGameDonePopup] = useState<boolean>(false);
    const [currentMode, setCurrentMode] = useState<BorderType>(BorderType.None);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const formattedTime =
        new Date(time * 1000)
            .toISOString()
            .substring(11, 19);

    const defaultStyleSymbol: SimpleFillSymbol = new SimpleFillSymbol({
        color: [0, 0, 0, 0.3], outline: { color: [0, 0, 0, 1], width: 1 }
    });

    const guessedCountrySymbol: SimpleFillSymbol = new SimpleFillSymbol({
        color: [0, 0, 0, 0.1], outline: { color: [0, 0, 0, 1], width: 0 }
    });

    const createPolygon = (coords: number[][]): Polygon => new Polygon({ rings: [coords] });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createGraphic = (box: Polygon, content: __esri.SymbolProperties, attributes?: any): Graphic => new Graphic({
        geometry: box,
        symbol: content,
        attributes: attributes
    });

    const addBordersFromGeoJson = (data: IGeoData, layer: GraphicsLayer): void => {
        data.features[0].geometry.coordinates.forEach((array3d) => {
          array3d.forEach((array2d) => {
            const box = createPolygon(array2d);
            const graphic = createGraphic(box, defaultStyleSymbol, data.features[0].properties.COUNTRY);
            layer.add(graphic);
          });
        });
      };

    const changeLayers = (borders: IGeoData[]): void => {
        if (!mapView) return;

        if (mapView.map.allLayers.length) {
            mapView.map.layers.removeAll();
        }

        const layer = new GraphicsLayer();
        layer.id = 'borders';

        borders.forEach((border) => {
          addBordersFromGeoJson(border, layer);
        });

        mapView.map.add(layer);
    };

      const startNewTime = (): void => {
        setTime(0);
        setIsRunning(true);
    };

    const getRandomCountry = (countriesList: string[]): string => {
        if (countriesList.length === 0) return '';

        const randomIndex = Math.floor(Math.random() * countriesList.length);
        const randomCountry = countriesList[randomIndex];

        return randomCountry;
    };

    const showGoodGuessPopup = (): void => {
        setShowGameMessagePopup(true);

        setTimeout(() => {
            setShowGameMessagePopup(false);
        }, 1500);
    };

    const onCountryClicked = (clickedCountry: string): void => {
        if (!mapView) return;

        const newGameData = { ...gameData };

        if (newGameData.guessCountry !== clickedCountry) {
            console.error('Wrong guess: ', newGameData.guessCountry, ' clicked: ', clickedCountry);

            return;
        }

        const countryIndex = newGameData.countriesLeft.findIndex((country) => country === clickedCountry);

        if (countryIndex === -1) return;

        newGameData.countriesLeft.splice(countryIndex, 1);

        newGameData.countriesDone.push(clickedCountry);

        const country = getRandomCountry(newGameData.countriesLeft);
        newGameData.guessCountry = country;

        if (newGameData.countriesLeft.length === 0) {
            newGameData.gameState = 'done';
            newGameData.time = time;
            setIsRunning(false);
            setShowGameDonePopup(true);
        }

        setGameData(newGameData);

        const bordersLayer = mapView.map.allLayers.find((x) => x.id === 'borders') as GraphicsLayer;

        for (const graphic of bordersLayer.graphics) {
            if (graphic.attributes !== clickedCountry) continue;

            graphic.symbol = guessedCountrySymbol;
            graphic.attributes = '';
        }

        showGoodGuessPopup();
    };

    const prepareGameData = (geoData: IGeoData[]): void => {
        if (!mapView) return;
        const countriesLeft: string[] = [];
        geoData.forEach((data) => countriesLeft.push(data.features[0].properties.COUNTRY));

        const country = getRandomCountry(countriesLeft);

        const newGameData: IGameData = { countriesLeft, countriesDone: [], guessCountry: country, time: 0, gameState: 'inProgress' };
        setGameData(newGameData);
        startNewTime();
        setShowGameDonePopup(false);
    };

    const changeBorders = (borderType: BorderType): void => {
        if (!mapView) return;
        let borderData: IGeoData[] = [];
        switch(borderType) {
            case BorderType.World:
                borderData = allBorders;
                break;
            case BorderType.EuropeanUnion:
                borderData = europeanUnion;
                mapView.center = new Point({ longitude: 21.017532, latitude: 52.237049 });
                break;
            default:
                // eslint-disable-next-line no-console
                console.error('Type not found');

                return;
        }
        setCurrentMode(borderType);
        changeLayers(borderData);
        prepareGameData(borderData);
    };

    const playAgain = (): void => {
        changeBorders(currentMode);
    };

    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 1000);

          if (!isRunning) {
            clearInterval(interval);
          }

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <MapContextData.Provider value={{ mapView, gameData, showGameMessagePopup, showGameDonePopup, formattedTime }}>
            <MapContextActions.Provider value={{
                setMapView,
                changeBorders,
                onCountryClicked,
                setShowGameMessagePopup,
                playAgain
                }}>
                {children}
            </MapContextActions.Provider>
        </MapContextData.Provider>
    );
};
