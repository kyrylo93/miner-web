import {getRandomNumberInRange} from "./getRandomNumberInRange";

export const getMapWithBombs = (map, amount, height, width) => {

    const newMap = [...map];
    const bombsList = [];

    for (let i = 0; i < amount; i++) {
        const x = getRandomNumberInRange(height);
        const y = getRandomNumberInRange(width);

        if (newMap[x][y].type === '-') {
            newMap[x][y].type = 'b';
            bombsList.push(newMap[x][y]);
        } else {
            i--
        }
    }

    return [bombsList, newMap];
};