function addSongInfo() {
    const formElement = document.querySelector("#form");
    const songInfo = document.querySelector("ul");

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const albumArt = formElement.newArtwork.value;
        const artist = formElement.newArtist.value;
        const album = formElement.newAlbum.value;
        const genre = formElement.newGenre.value;
        const year = formElement.newYear.value;
        const price = formElement.newPrice.value;
        const stockStatus = formElement.newStock.value;

        formElement.reset();

        if (albumArt && artist && album && genre && year) {
            const entry = createSongEntry(albumArt, artist, album, genre, year, price, stockStatus);
            songInfo.insertBefore(entry, songInfo.firstChild);
        } else {
            const errorBox = document.createElement("div");
            errorBox.textContent = "Please enter a value in all required fields.";
            errorBox.classList.add("error-box");
            formElement.appendChild(errorBox);
            
            setTimeout(() => {
                errorBox.remove();
            }, 5000);
        }
    });

    function createSongEntry(albumArt, artist, album, genre, year, price, stockStatus) {
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

    function createAlbumArtworkImage(albumArt, altText) {
        const image = document.createElement("img");
        image.src = albumArt;
        image.alt = altText;
        image.style.width = "250px";
        return image;
    }
    
    function createSongDetails(artist, album, genre, year, price, stockStatus) {
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

    function editSong(entry, albumArt, artist, album, genre, year, price, stockStatus) {
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

    function createInputField(type, name, value) {
        const inputField = document.createElement("input");
        inputField.type = type;
        inputField.name = name;
        inputField.value = value;
        return inputField;
    }
}

addSongInfo();
