let search = document.getElementById("searchInput");

let spinEl = document.getElementById("spinner");

let divContainer = document.getElementById("searchResults");

function createAndAppend(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");


    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let brEl = document.createElement("br");
    brEl.appendChild(resultItemEl);


    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.target = "_blank";
    linkEl.textContent = link;
    linkEl.classList.add("result-url");
    resultItemEl.appendChild(linkEl);

    let br = document.createElement("br");
    resultItemEl.appendChild(br);

    let paraEl = document.createElement("p");
    paraEl.textContent = description;
    paraEl.classList.add("ink-description");
    resultItemEl.appendChild(paraEl)

    divContainer.appendChild(resultItemEl);
}


function display(searchResults) {
    spinEl.classList.add("d-none")

    for (let result of searchResults) {
        createAndAppend(result)
    }

}


function details(event) {
    if (event.key === "Enter") {
        spinEl.classList.remove("d-none");
        divContainer.textContent = "";

        let inputVal = search.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputVal;

        let option = {
            method: "GET"
        }
        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;

                display(search_results);
            })
    }
}



search.addEventListener("keydown", details)
