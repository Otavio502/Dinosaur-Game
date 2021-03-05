const dino = document.getElementById("dino");

function jump() {
    dino.classList.add("jump");
    
     setTimeout(function() {
        dino.classList.remove("jump");
    }, 300);
}

document.addEventListener("keydown", function (event){ jump(); });