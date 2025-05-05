const setTypeColor = (inpColor) => {
    switch (inpColor) {
        case "No Type":
            return "darkgrey"
        case "Grass":
            return "green";
        case "Fire":
            return "red";
        case "Normal":
            return "lightgray";
        case "Poison":
            return "purple"
        case "Flying":
            return "cyan";
        case "Water":
            return "skyblue";
        case "Bug":
            return "lightgreen";
        case "Electric":
            return "yellow";
        case "Ground":
            return "chocolate";
        case "Rock":
            return "lightslategray";
        case "Fairy":
            return "mediumorchid";
        case "Fighting":
            return "moccasin"
        case "Psychic":
            return "indigo"
        case "Ghost":
            return "steelblue"
        case "Ice":
            return "turquoise"
        case "Steel":
            return "mediumaquamarine"
        default:
            break;
    };
};

export {
    setTypeColor,
}