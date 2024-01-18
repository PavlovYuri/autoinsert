const startBtn = document.getElementById("start-btn"); 
const responseTextField = document.getElementById("response-text-field");
startBtn.addEventListener("click", () => {
    let queryOptions = {active: true, lastFocusedWindow: true};
    chrome.tabs.query(queryOptions, (tabs) => {
            const tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: true},
                        func: grabObjects
                    }
                ).then(injectionResults => {
                    let request = {
                        "results": []
                    };
                    for (const {frameId, result} of injectionResults) {
                        request["results"].push(result);
                    }
                    fetch("http://localhost:7000/", {
                        method: "POST", 
                        headers: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(request)
                    })
                        .then(response => response.json())
                        .then(answer => {
                            responseTextField.innerText = answer["text"];
                        });
                });
            } else {
                alert("There are no active tabs");
            }
    })
});

function grabObjects() {
    let images = document.querySelectorAll("img");
    images = Array.from(images).map(image => image.src);

    const text = document.body.innerText;

    const result = {
        "images": images, 
        "text": text
    };
    console.log(result);

    return result;
}
