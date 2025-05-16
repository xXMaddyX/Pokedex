import { setTypeColor } from "./typeColorChecker.js";
//---------------------->>>>CREATE_TOP_INFO<<<<-------------------------
const createNameNumImg = (rawPokemonData) => {
    const pokemonName = document.createElement("h1");
    pokemonName.innerText = `${rawPokemonData.name[0].toUpperCase()}${rawPokemonData.name.slice(1)}`;
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const pokeNr = document.createElement("h5");
    pokeNr.innerText = `No.${rawPokemonData.id}`;
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const pokeMonImage = document.createElement("img");
    pokeMonImage.classList.add("poke-img")
    pokeMonImage.src = rawPokemonData.sprites.front_default;
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    return {pokemonName, pokeNr, pokeMonImage};
};
//----------------------------------------------------------------------
//-------------------->>>>CREATE_TYP_CONTAINER<<<<----------------------
const createTypeContainer = (rawPokemonData) => {
    //------------------>>>>TYPE_CONTAINER<<<<--------------------------
    const typeContainer = document.createElement("div");
    typeContainer.classList.add("type-container");
    //------------------------------------------------------------------
    //----------------->>>>TYPE1_CONTAINER<<<<--------------------------
    const Type1Container = document.createElement("div");
    const Type1Heading = document.createElement("h4");
    Type1Heading.textContent = "Type 1"
    const Type1Data = document.createElement("h5");
    Type1Data.textContent = `${rawPokemonData.types[0].type.name[0].toUpperCase()}${rawPokemonData.types[0].type.name.slice(1)}`;
    Type1Container.style.backgroundColor = setTypeColor(Type1Data.textContent);
    Type1Container.append(Type1Heading, Type1Data);
    //------------------------------------------------------------------
    //----------------->>>>TYPE2_CONTAINER<<<<--------------------------
    const Type2Container = document.createElement("div");
    const Type2Heading = document.createElement("h4");
    Type2Heading.textContent = "Type 2"
    const Type2Data = document.createElement("h5");
    Type2Data.textContent = rawPokemonData.types[1] ? `${rawPokemonData.types[1].type.name[0].toUpperCase()}${rawPokemonData.types[1].type.name.slice(1)}` : "No Type";
    Type2Container.style.backgroundColor = setTypeColor(Type2Data.textContent);
    Type2Container.append(Type2Heading, Type2Data);
    //------------------------------------------------------------------
    typeContainer.append(Type1Container, Type2Container);
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    return typeContainer;
};
//----------------------------------------------------------------------
//-------------------->>>>CREATE_DETAIL_BUTTON<<<<----------------------
const createInfoButton = (rawPokemonData) => {
    //!!!!!!!!!!!!!!!!!!!!!!<<<<NEED_TO_IMPLEMENT>>>>-------------------
    /**@type {HTMLElement} */
    const infoButton = document.createElement("button");
    infoButton.classList.add("container-info-button");
    infoButton.textContent = "INFO";
    infoButton.style.marginTop = "10px"

    infoButton.addEventListener("click", () => {
        //ADD_CARD_MODAL!!!!!!!!!!!!!!!!
        console.log(rawPokemonData) 
    });

    return infoButton;
};
//----------------------------------------------------------------------
//-------------------------->>>>EXPORTS<<<<-----------------------------
export {
    createNameNumImg,
    createTypeContainer,
    createInfoButton
};