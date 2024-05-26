// run JS only after DOM load complete
document.addEventListener('DOMContentLoaded', init);

function init () {
    // add event listener to dog breed filter dropdown
    const filterDropdown = document.querySelector('select#breed-dropdown');
    filterDropdown.addEventListener('change', event => {
        const filter = event.target.value;
        postDogBreeds(filter);
    })

    // call the main functions
    postDogImgs();
    postDogBreeds();
}

function postDogImgs() {
    // retrieve image urls from server
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(json => buildDogImgTable(json['message']));

    function buildDogImgTable(dogImgArr) {
        // create and define table
        const dogImgTable = document.createElement('table');
        dogImgTable.className = 'dog-image-framework';

        // populate table with images
        const dogImgTableRow = document.createElement('tr');
        dogImgArr.forEach(url => dogImgTableRow.appendChild(buildDogImgTableCell(url)));
        dogImgTable.appendChild(dogImgTableRow);

        // append table to container element
        const dogImgContainer = document.getElementById('dog-image-container');
        dogImgContainer.appendChild(dogImgTable);
    }
    
    function buildDogImgTableCell(dogImgUrl) {
        // create table cell
        const dogImgCell = document.createElement('td');        
        
        // create and define image element
        const dogImgElement = document.createElement('img');
        dogImgElement.src = dogImgUrl;
        dogImgElement.className = 'dog-image';

        // Populate cell with img element
        dogImgCell.appendChild.dogImgElement;
    
        return dogImgElement;
    }
}

function postDogBreeds(filter = 'all') {
    // retrieve breed names from server
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(resp => resp.json())
        .then(json => {
            const breedList = json['message'];
            if (filter === 'all') {
                buildDogBreedList(breedList);
            } else {
                const breedListkeys = Object.keys(breedList);
                const filteredKeys = breedListkeys.filter(key => key.startsWith(filter));
                const filteredBreedList = {};
                filteredKeys.forEach(key => filteredBreedList[key] = breedList[key]);
                buildDogBreedList(filteredBreedList)
            }
        });

    function buildDogBreedList(breedList) {
        // define breed list container element
        const breedListContainer = document.getElementById('dog-breeds');
        breedListContainer.innerHTML = '';

        // populate list container with dog breeds
        for (const breed in breedList) {
            const breedListItem = document.createElement('li');
            breedListItem.className = 'breed-name';

            // add event listener for colour change functionality
            breedListItem.addEventListener('click', event => {colourChange(event)});

            // conditional to enable breed subtypes to be displayed
            const hasSubtypes = breedList[breed].length > 0

            switch (hasSubtypes) {
                case true:
                    for (const subtype of breedList[breed]) {
                        breedListItem.innerText = `${subtype} ${breed}`;
                        breedListContainer.appendChild(breedListItem);
                    }
                    break;
                case false:
                    breedListItem.innerText = `${breed}`;
                    breedListContainer.appendChild(breedListItem);
                    break;
            }
        }
    }
}

function colourChange(event) {
    if (event.target.className === 'breed-name colour') event.target.className = 'breed-name';
    else if (event.target.className === 'breed-name') event.target.className = 'breed-name colour';
}