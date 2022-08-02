import apiKey from "./apikey.js";
//function to get random number
function getRandomNumber(number) {
    var max = number+1;
    return Math.floor(Math.random() * Math.floor(max));
}
//listen to message
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    
    if(msg.name == "fetchWords"){

        //we call api
        //wait for response
        //send response
        const dateStr = new Date().toISOString().slice(0, 10); //get date in the formate YYYY-MM-DD

        const apiCall = "https://api.wordnik.com/v4/words.json/wordOfTheDay?date="+dateStr+"&api_key="+apiKey

        
        fetch(apiCall).then((res) => {
            if(res.status !== 200){
                response({word: "Error", desc: "There was an error fetching the word of the day"})
                return;
            }
            res.json().then((data) => {
                response({word: data.word, desc: data.note})
            })
        }).catch((err) => {
            response({word: "Error", desc: "There was an error fetching the word of the day"})
        })
            
       

        // const wordsObj = [
        //     "surimono",
        //     "flanconade",
        //     "perihelion",
        //     "brailler",
        //     "needfire"

        // ]

        // const wordsDesObj = [
        //     "A kind of Japanese woodblock print, privately commissioned for special occasions such as the New Year.",
        //     "In <em>fencing</em>, the ninth and last thrust, usually aimed at the side.",
        //     "The point in a solar orbit where the orbiting body is closest to the sun.",
        //     "<em>technology</em> A typewriter used to emboss paper with braille cells to be read by the visually impaired instead of using a manual stylus.",
        //     "A fire produced by the friction of one piece of wood upon another, or of a rope upon a stake of wood."

        // ];

        // var number = getRandomNumber(4);



        //send response
        // response({word: wordsObj[number], desc: wordsDesObj[number]});
    }

    return true;
});