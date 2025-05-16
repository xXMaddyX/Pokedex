const inputRef = document.querySelector("#input-bar");

const searchBarStates = {
    rawBuffer: [],
    sortedBuffer: [],
    isSearchReady: false,
};
//--------------------------------------------------------------------------------->
let FUNC_REFS = {
    createCards: null,
    renderCards: null,
    initFetch: null,
    Offset: null,
    Page: null
}
//--------------------------------------------------------------------------------->
//------------------------------->>>>INIT_REFS<<<<--------------------------------->
const initRefs = (createCards, renderCards, initFetch, offset, page) => {
    FUNC_REFS.createCards = createCards;
    FUNC_REFS.renderCards = renderCards;
    FUNC_REFS.initFetch = initFetch;
    FUNC_REFS.Offset = offset;
    FUNC_REFS.Page = page;
};
//--------------------------------------------------------------------------------->
//-------------------------->>>>INIT_SEARCH_FUNCTION<<<<--------------------------->
const initSearchBar = async () => {
    await loadCompleteDBForSearch();
    await bufferDataSearch();
}
//--------------------------------------------------------------------------------->
//----------------------------->>>>INPUT_LISTENER<<<<------------------------------>
inputRef.addEventListener("input", (e) => {
    let inp = e.target.value;
    if (inp.length >= 3) {
        filterBufferForMatches(e)
    } else if (inp.length <= 0) {
        searchBarStates.isSearchReady = false;
        FUNC_REFS.initFetch(FUNC_REFS.Page * FUNC_REFS.Offset);
    }
});
//--------------------------------------------------------------------------------->
//-------------------------->>>>FILTER_BUFFER<<<<---------------------------------->
const filterBufferForMatches = (e) => {
    searchBarStates.rawBuffer.forEach((elem) => {
        if (elem.name.startsWith(e.target.value.toLowerCase()) && !searchBarStates.sortedBuffer.includes(elem)) {
          searchBarStates.sortedBuffer.push(elem);
        };
    });
    document.querySelector(".content").innerHTML = "";
    FUNC_REFS.renderCards(searchBarStates.sortedBuffer);
    searchBarStates.sortedBuffer = [];
};
//------------------------->>>>INITIAL_LOAD_SEARCH--------------------------------->
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const loadCompleteDBForSearch = async () => {
    try {
        let dbData = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0");
        let responce = await dbData.json();
        searchBarStates.rawBuffer = responce.results;
    } catch (err) {
        return new Error("Search Fail: ", err)
    };
};
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const bufferDataSearch = async () => {
    try {
        await Promise.all(searchBarStates.rawBuffer.map(async (element) => {
            const data = await fetch(element.url);
            element.pokeData = await data.json();
            delete element.url;
        }));
        searchBarStates.isSearchReady = true;
    } catch (err) {
        return new Error("Fail at Buffer", err);
    };
};
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//-------------------------------------------------------------------------------->
const updateFUNCRefs = (page) => {
    FUNC_REFS.Page = page;
};
export {
    initSearchBar,
    initRefs,
    FUNC_REFS,
    updateFUNCRefs
}