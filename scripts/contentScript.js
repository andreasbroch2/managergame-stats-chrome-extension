console.log("Contentscript");
console.log("document:", document)
// Run script when #results changes
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        lookForPlayers();
    });
}
);
observer.observe(document.querySelector('#results'), {
    attributes: true,
    childList: true,
    characterData: true
});
function lookForPlayers(){
    const elements = document.querySelectorAll('[class*="PersonName__full"]');
    const names = Array.from(elements).map(element => element.textContent.trim());
    injectButton(elements);
    console.log(names);
    return names;
}
// Run lookForPlayers after 2 seconds
setTimeout(lookForPlayers, 2000);

// Inject a small button next to each player name found
const injectButton = function (elements) {
    elements.forEach(element => {
        const button = document.createElement('button');
        button.innerHTML = "👀";
        button.onclick = function () {
            console.log("Clicked on", name);
        };
        element.after(button);
    });
}
