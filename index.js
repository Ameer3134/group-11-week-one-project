document.addEventListener("DOMContentLoaded", () => {

    const adviceNumber = document.querySelector(".adv");
    const adviceQuote = document.querySelector(".quote");
    const diceBtn = document.querySelector(".get-advice");
    const container = document.querySelector(".container");

    let currentAdvice = {};

    // Create Save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "❤️ Save Favourite";
    saveBtn.className =
        "bg-[hsl(150,100%,66%)] text-black px-4 py-2 rounded mt-4 hover:bg-[hsl(150,100%,76%)]";

    // Create Favourite section
    const title = document.createElement("h3");
    title.textContent = "My Favourite Advice";
    title.className = "text-[hsl(150,100%,66%)] text-lg mt-4";

    const favouritesList = document.createElement("ul");
    favouritesList.className = "w-full text-left mt-2";

    container.appendChild(saveBtn);
    container.appendChild(title);
    container.appendChild(favouritesList);

    async function fetchAdvice() {
        try {
            const response = await fetch("https://api.adviceslip.com/advice");

            if (!response.ok) {
                throw new Error("Could not fetch response");
            }

            const data = await response.json();

            adviceNumber.textContent = `ADVICE #${data.slip.id}`;
            adviceQuote.textContent = `"${data.slip.advice}"`;

            currentAdvice = {
                id: data.slip.id,
                advice: data.slip.advice
            };

        } catch (error) {
            console.error(error);
        }
    }

    function displayFavourites() {

        const favourites =
            JSON.parse(localStorage.getItem("favourites")) || [];

        favouritesList.innerHTML = "";

        favourites.forEach(item => {

            const li = document.createElement("li");

            li.className =
                "flex justify-between items-center border-b border-gray-500 py-2";

            li.innerHTML = `
                <span>${item.advice}</span>
                <button data-id="${item.id}">❌</button>
            `;

            li.querySelector("button").addEventListener("click", () => {
                removeFavourite(item.id);
            });

            favouritesList.appendChild(li);
        });
    }

    function removeFavourite(id) {

        let favourites =
            JSON.parse(localStorage.getItem("favourites")) || [];

        favourites = favourites.filter(item => item.id !== id);

        localStorage.setItem(
            "favourites",
            JSON.stringify(favourites)
        );

        displayFavourites();
    }

    saveBtn.addEventListener("click", () => {

        if (!currentAdvice.id) return;

        let favourites =
            JSON.parse(localStorage.getItem("favourites")) || [];

        const exists = favourites.some(item => item.id === currentAdvice.id);

        if (!exists) {
            favourites.push(currentAdvice);

            localStorage.setItem(
                "favourites",
                JSON.stringify(favourites)
            );

            displayFavourites();
        } else {
            alert("Already saved.");
        }
    });

    diceBtn.addEventListener("click", fetchAdvice);

    fetchAdvice();
    displayFavourites();

});