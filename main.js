function addSongInfo() {
    // Selects the form
    const formElement = document.querySelector("#form");
    // Selects the list for song info
    const songInfo = document.querySelector("ul");

    // Listens for form submission
    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        // Retrieves input values from the form
        const albumArt = formElement.newArtwork.value;
        const artist = formElement.newArtist.value;
        const album = formElement.newAlbum.value;
        const genre = formElement.newGenre.value;
        const year = formElement.newYear.value;
        const price = formElement.newPrice.value;
        const stockStatus = formElement.newStock.value;

        // Clears the form after submission
        formElement.reset();

        // Checks if info is provided
        if (albumArt && artist && album && genre && year) {
            // Creates a new song entry with provided data
            const entry = createSongEntry(albumArt, artist, album, genre, year, price, stockStatus);
            songInfo.insertBefore(entry, songInfo.firstChild);
        } else {
            // Displays an error message if required fields are incomplete
            const errorBox = document.createElement("div");
            errorBox.textContent = "Please enter a value in all required fields.";
            errorBox.classList.add("error-box");
            formElement.appendChild(errorBox);
            
            // Removes the error message after 5 seconds
            setTimeout(() => {
                errorBox.remove();
            }, 5000);
        }
    });

    // Creates a new song entry with provided information
    function createSongEntry(albumArt, artist, album, genre, year, price, stockStatus) {
        // Creates buttons for editing and deleting
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            editSong(entry, albumArt, artist, album, genre, year, price, stockStatus);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            entry.remove();
        });

        // Creates a new list item (song entry)
        // Populates it with image, details, and buttons
        const entry = document.createElement("li");
        const image = createAlbumArtworkImage(albumArt);
        const details = createSongDetails(artist, album, genre, year, price, stockStatus);

        entry.appendChild(image);
        entry.appendChild(details);
        entry.appendChild(deleteButton);
        entry.appendChild(editButton);

        entry.classList.add("entry")

        return entry;
    }

    // Creates an image element for the album artwork
    function createAlbumArtworkImage(albumArt, altText) {
        // Creates an image element with provided source and alternative text
        const image = document.createElement("img");
        image.src = albumArt;
        image.alt = altText;
        image.style.width = "250px";
        return image;
    }
    
    // Creates a div element containing song details
    function createSongDetails(artist, album, genre, year, price, stockStatus) {
        // Creates paragraphs for different details (artist, album, genre, year, price, stock status)
        // Populates the details div with these paragraphs
        const details = document.createElement("div");
        
        const artistParagraph = document.createElement("p");
        artistParagraph.textContent = `Artist: ${artist}`;
        details.appendChild(artistParagraph);
        
        const albumParagraph = document.createElement("p");
        albumParagraph.textContent = `Album: ${album}`;
        details.appendChild(albumParagraph);
        
        const genreParagraph = document.createElement("p");
        genreParagraph.textContent = `Genre: ${genre}`;
        details.appendChild(genreParagraph);
        
        const yearParagraph = document.createElement("p");
        yearParagraph.textContent = `Year: ${year}`;
        details.appendChild(yearParagraph);
        
        const priceParagraph = document.createElement("p");
        priceParagraph.textContent = `Price: ${price}`;
        details.appendChild(priceParagraph);
        
        const stockParagraph = document.createElement("p");
        stockParagraph.textContent = `Stock Status: ${stockStatus}`;
        details.appendChild(stockParagraph);
        
        return details;
    }

    // Edits an existing song entry
    function editSong(entry, albumArt, artist, album, genre, year, price, stockStatus) {
        // Clears the entry for editing
        // Creates input fields for each piece of song information
        // Creates a 'save' button and defines its behavior
        entry.innerHTML = "";

        const albumArtInput = createInputField("text", "newArtwork", albumArt);
        const artistInput = createInputField("text", "newArtist", artist);
        const albumInput = createInputField("text", "newAlbum", album);
        const genreInput = createInputField("text", "newGenre", genre);
        const yearInput = createInputField("text", "newYear", year);
        const priceInput = createInputField("text", "newPrice", price);
        const stockInput = createInputField("text", "newStock", stockStatus)

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {
            const updatedAlbumArt = albumArtInput.value;
            const updatedArtist = artistInput.value;
            const updatedAlbum = albumInput.value;
            const updatedGenre = genreInput.value;
            const updatedYear = yearInput.value;
            const updatedPrice = priceInput.value;
            const updatedStock = stockInput.value;

            const updatedEntry = createSongEntry(
                updatedAlbumArt,
                updatedArtist,
                updatedAlbum,
                updatedGenre,
                updatedYear,
                updatedPrice,
                updatedStock
            );

            songInfo.replaceChild(updatedEntry, entry);
        });

        entry.appendChild(albumArtInput);
        entry.appendChild(artistInput);
        entry.appendChild(albumInput);
        entry.appendChild(genreInput);
        entry.appendChild(yearInput);
        entry.appendChild(priceInput);
        entry.appendChild(stockInput);
        entry.appendChild(saveButton);
    }

    // Creates an input field element
    function createInputField(type, name, value) {
        // Creates an input field of specified type with a given name and value
        const inputField = document.createElement("input");
        inputField.type = type;
        inputField.name = name;
        inputField.value = value;
        return inputField;
    }
}

// Initiates the function when the page loads
addSongInfo();
