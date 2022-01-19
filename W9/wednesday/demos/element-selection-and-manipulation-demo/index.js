window.onload = () => {
    document.getElementById('remove').addEventListener("click", ev => {
        const ball = document.getElementById("ball");
        console.log(ball);
        ball.classList.remove("red-ball");
    });
    document.getElementById("click-me").addEventListener("click", ev => {
        // const ball = document.getElementById("ball");
        // console.log(ball);
        // ball.classList.add("red-ball");
        
        // const instructor = document.querySelector(".instructor");
        // console.log(instructor);
        // instructor.style.color = "red";
        // instructor.innerText += '!';

        // const instructors = document.querySelectorAll(".instructor");
        // console.log(instructors);
        // instructors.forEach(instructor => {
        //     instructor.style.color = "red";
        // });

        
        const playground = document.getElementById("playground");
        // playground.innerHTML += `
        //     <h2 class='red'>Hope you enjoyed the demo!</h2>
        //     <img
        //         src='https://p4.wallpaperbetter.com/wallpaper/70/625/78/animal-baby-cute-dog-wallpaper-preview.jpg'
        //     >
        // `;

        /*
        <div id="playground">
            <h2 class="red">Hope you enjoyed the demo!<h2>
            <img src="https://p4.">
        </div>
        
        
        */
        const h2 = document.createElement('h2');
        const title = document.createTextNode('Hope you enjoyed the demo!')
        h2.appendChild(title);
        h2.classList.add('red');
        const img = document.createElement('img');
        img.setAttribute('src', 'https://p4.wallpaperbetter.com/wallpaper/70/625/78/animal-baby-cute-dog-wallpaper-preview.jpg');
        

    });


}