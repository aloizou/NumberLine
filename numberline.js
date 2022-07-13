//Select all dashes
let dashes = document.getElementsByClassName("dash")
//Reference to track which dash is dragged
let dragged;
//Initial bolding of the selected range, using the defined Function
boldBetween();

//Preventing default allows the drag to be dropped
document.addEventListener("dragover", event => {
    event.preventDefault();
});

//When dragging starts, save the dragged element to the reference
document.addEventListener("dragstart", event => {
    //Check one of the selected dashes is being dragged
    if (event.target.classList.contains("selected"))
        dragged = event.target;
    else
        dragged = null;
    console.log(dragged)
});

//Listen to the drop event on the entire document
document.addEventListener("drop", event => {
    event.preventDefault();
    //Calculate the horizontal distance to every dash mark, and find the nearest index
    const distances = [];
    let nearest = -1;
    for (let i = 0; i < dashes.length; i++) {
        distances[i] = Math.abs(event.x - dashes[i].offsetLeft);
        if (i === 0)
            nearest = 0;
        else if (distances[i] < distances[nearest])
            nearest = i;
    }
    //Prevent either of the selected spots being dragged onto the other
    let selected = document.getElementsByClassName("selected");
    if (dragged && nearest != selected[0].id && nearest != selected[1].id) {
        //Switch the classes so the nearest dash is now selected
        dashes[nearest].classList.add("selected");
        //Deselect the original dash
        dragged.classList.remove("selected");
        //Correct the bolded lines to reflect the change
        boldBetween();
        dragged = null;
    }
});



//Function to bold the selected range
function boldBetween() {
    let lines = document.getElementsByClassName("line");
    let selected = document.getElementsByClassName("selected");
    //Bold the line in between the two selected dashes
    //Also unbold the lines that are not
    for (let i = 1; i < lines.length - 1; i++) {
        if (i > selected[0].id && i <= selected[1].id)
            lines[i].classList.add("bold");
        else
            lines[i].classList.remove("bold");
    }
}