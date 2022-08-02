//send message to Background
chrome.runtime.sendMessage({name: "fetchWords"}, (response) => {
    //wait for response

    
    console.log(response)

    document.querySelector("#word").innerHTML = response.word;
    document.querySelector("#desc").innerHTML = response.desc;

});