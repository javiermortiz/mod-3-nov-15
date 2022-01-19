// Making buttons interactive

// Add dog button
const add = document.getElementById("add");
add.addEventListener("click", async () => {
    console.log("click");
    try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random")
        const data = await res.json();
        console.log(data);
        // URL of new dog image
        const url = data.message;
        console.log(url);
        // Get breed (Hint: Parse from URL)
        
        // Create element to inject 

        // Inject element into correct location

    } catch (e) {
        console.log("Couldn't fetch dog :(")
    }
});

// Remove first dog button
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
    // Select first dog

    // Remove

});

// Remove last dog button
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
    // Select last dog

    // Remove

});
