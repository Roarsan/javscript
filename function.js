const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const toCurr = document.querySelector(".to select");
const fromCurr = document.querySelector(".from select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button");

async function getList() {
    try {
        const response = await fetch(url);

        // Parse the JSON data
        const data = await response.json();


        // Populate dropdowns with currency codes
        dropdowns.forEach((dropdown) => {
            for (const [countryCode] of Object.entries(data)) {
                const option = document.createElement("option");
                option.value = countryCode; // Set the value for later reference
                option.innerText = countryCode.toUpperCase();; // Display the country code
                dropdown.appendChild(option);
            }
        });

        // Add event listeners to dropdowns for flag updates
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("change", (event) => {
                updateFlag(event.target);
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const updateFlag = (element) => {
    let currCode = element.value.slice(0, -1).toUpperCase();
    let newSrc = `https://flagsapi.com/${currCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    let from = fromCurr.value;
    let to = toCurr.value;

    const fromUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
    let response = await fetch(fromUrl);
    let data = await response.json();
    const rate = data[from]?.[to];
    
    let finalAmount = amountVal * rate;
    msg.innerText = `Converted Amount: ${finalAmount} ${to.toUpperCase()}`;

});




getList();

