export interface IGameData {
    countriesLeft: string[];
    countriesDone: string[];
    guessCountry: string;
    time: number;
    gameState: 'notStarted' | 'inProgress' | 'done';
}
