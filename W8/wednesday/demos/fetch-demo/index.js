document.addEventListener("DOMContentLoaded", ev => {
    const form = document.querySelector("form");
    form.addEventListener("submit", async ev => {
        ev.preventDefault();
        const input = document.querySelector("input");
        const number = input.value;

        let res;
        try {
            res = await fetch(`https://swapi.dev/api/people/${number}`);
            console.log(res);
            const resBody = await res.json();
            console.log(resBody);
            const people = document.querySelector("#people");
            people.innerHTML = `What Star Wars character has ${resBody.eye_color} eyes?`;
            setTimeout(() => {
                people.innerHTML += `<h2>${resBody.name}</h2>`;
                input.value = "";
            }, 5000);
        } catch (e) {
            console.log(res.ok);
            console.log(res.status);
        }
    })
});

