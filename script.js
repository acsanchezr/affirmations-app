let displayedAffirmations = [];  ///stores indices of displayed books


async function loadAffirmations(){
    //try...catch statement is comprised of a try block and either a 
    // catch block, a finally block, or both. The code in the try 
    // block is executed first, and if it throws an exception, the 
    // code in the catch block will be executed. The code in the finally 
    // block will always be executed before control flow exits the 
    // entire construct
    try{
        const response = await fetch("affirmations.json");
        const data = await response.json();
        return data.affirmations;
    } catch (error) {
        console.error("Error loading affirmations: ", error);
        return [];
        }
    }


async function displayAffirmation(){
    const affirmations = await loadAffirmations();

    if(displayedAffirmations.length === affirmations.length){
        displayedAffirmations = [];
    }
    
    let randomIndex;
    do{
        randomIndex = Math.floor(Math.random() * affirmations.length);
    } while(displayedAffirmations.includes(randomIndex));

    displayedAffirmations.push(randomIndex);

    document.getElementById("affirmation").innerText = affirmations[randomIndex];


    // if(affirmations.length > 0){
    //     const randomIndex = Math.floor(Math.random() * affirmations.length);
    //     document.getElementById("affirmation").innerText = affirmations[randomIndex];
    // }
}

//change affirmation onclick
document.getElementById("new-affirmation").addEventListener("click",displayAffirmation);

//used to play music
const music = document.getElementById("bg-music");
const musicButton = document.getElementById("toggle-music");

musicButton.addEventListener("click", function() {
    if (music.paused) {
        music.play();
        musicButton.textContent = "⏸️ Pause Music";
    } else {
        music.pause();
        musicButton.textContent = "🎵 Play Music";
    }
});

const { contextBridge, ipcRenderer } = require('electron');

// Expose closeWindow method to the renderer process
contextBridge.exposeInMainWorld('electron', {
    closeWindow: () => ipcRenderer.send('close-window')
});
// Close window via ipcRenderer
document.querySelector('.close-btn').addEventListener('click', () => {
    window.electron.closeWindow();
});




// Load a random affirmation on page load
window.onload = displayAffirmation;