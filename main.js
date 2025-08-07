import { createNameNumImg, createTypeContainer, createInfoButton } from "./constructCards.js";
import { initRefs, initSearchBar, updateFUNCRefs } from "./searchBar.js";
//--------------------------->>>>GLOBALS<<<<------------------------------
let Page = 0;
let Offset = 20;
let BUFFER = [];
let SORTED_BUFFER = [];
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const prevButton = document.querySelectorAll(".prev");
const nextButton = document.querySelectorAll(".next");
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const content = document.querySelector(".content");
//------------------------------------------------------------------------
//----------------------->>>>FETCH_BASE_DATA<<<<--------------------------
async function initFetch(offset) {
    await fetchData(offset);
    await bufferData();
    sortBuffer();
    renderCards(SORTED_BUFFER);
};
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const fetchData = async (offset) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`);
    const rawData = await data.json()
    BUFFER = rawData.results;
    content.innerHTML = ""
};
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const bufferData = async () => {
    await Promise.all(BUFFER.map(async (element) => {
        const data = await fetch(element.url);
        element.pokeData = await data.json();
        delete element.url;
    }));
};
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const sortBuffer = () => {
    SORTED_BUFFER = new Array(BUFFER.length);
    BUFFER.forEach((element) => {
        SORTED_BUFFER[element.pokeData.id -1] = element
    });
};
//------------------------------------------------------------------------
//------------------------>>>>RENDER_CARDS<<<<----------------------------
const renderCards = (inpBuffer) => {
    inpBuffer.forEach((element) => {
        createCards(element.pokeData);
    });
};
//------------------------>>>>CREATE_CARDS<<<<----------------------------
const createCards = (rawPokemonData) => {
    //CARD_CONTAINER::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const cardConteiner = document.createElement("div");
    cardConteiner.classList.add("card-container");
    //CARD_INFOS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const {pokemonName, pokeNr, pokeMonImage} = createNameNumImg(rawPokemonData);
    const typeContainer = createTypeContainer(rawPokemonData);
    //CARD_BUTTON:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const ConatinerButton = createInfoButton(rawPokemonData);
    //ADD_ELEMENTS_TO_CONTAINER:::::::::::::::::::::::::::::::::::::::::::
    cardConteiner.append(pokemonName, pokeNr, pokeMonImage, typeContainer, ConatinerButton);
    content.append(cardConteiner);
};
//------------------------------------------------------------------------
const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

document.addEventListener("DOMContentLoaded", () => {
    prevButton.forEach((button) => {
        button.addEventListener("click", () => {
            if (Page > 0) {
                Page -= 1
            };
            initFetch(Page * Offset);
            scrollTop();
            updateFUNCRefs(Page);
        }); 
    });
    nextButton.forEach((button) => {
        button.addEventListener("click", () => {
            Page += 1;
            initFetch(Page * Offset);
            scrollTop();
            updateFUNCRefs(Page);
        });
    })

    Page = 0;
    initRefs(createCards, renderCards, initFetch, Offset, Page);
    initCallsAsync(Offset, Page);
});

async function initCallsAsync(Page, Offset) {
    await initFetch(Page * Offset);
    await initSearchBar();
}