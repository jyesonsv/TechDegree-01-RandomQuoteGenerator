//My selected archive of quotes - I used booleans [f] for indicating lack of citation &OR year to be referred to later by the printQuote()

let quotes = [
    {
        quote: `Even though a hedgehog may want to become close with another hedgehog. The closer they get the more they injure each other with their spines.`,
        source: "Ritsuko Akagi",
        citation: "Neon Genesis Evangelion",
        year: 1995
    },

    {
        quote: `You may not be able to fight like a Samurai, but at least you can die like a Samurai.`,
        source: "O-Ren Ishii",
        citation: "Kill Bill Vol. 1",
        year: 2003
    },

    {
        quote: `Don’t cry because it’s over, cry because it happened.`,
        source: "Zach Hadel",
        citation: "Oney Plays Stream",
        year: false
    },

    {
        quote: `That thing was too big to be called a sword. Too big, too thick, too heavy, and too rough, it was more like a large hunk of iron.`,
        source: "Kentaro Miura",
        citation: "Berserk",
        year: 1990
    },

   {
        quote: `Chaos isn't a pit. Chaos is a ladder. Many who try to climb it fail and never get to try it again. The fall breaks them. And some are given a chance to climb. They refuse.`,
        source: "Petyr Baelish",
        citation: "Game of Thrones",
        year: "2011"
    },

    {
        quote: `You only get better at everything you are doing, thinking and feeling right at this very moment. This can be a gift or a curse.`,
        source: "Anon",
        citation: false,
        year: false
    },

    {
        quote: `You're not my supervisor!`,
        source: "Pam",
        citation: "Archer",
        year: false
    },

    {
        quote: `Man who stand on toilet, high on pot.`,
        source: "Confucious",
        citation: false,
        year: false
    },

    {
        quote: `As long as you are going to be thinking anyway, think big.`,
        source: "Donald J. Trump",
        citation: false,
        year: false
    },

    {
        quote: `The man who passes the sentence should swing the sword. If you would take a man's life, you owe it to him to look into his eyes and hear his final words. And if you cannot bear to do that, then perhaps the man does not deserve to die.`,
        source: "Ned Stark",
        citation: "Game of Thrones",
        year: false
    },

    {
        quote: `Yo, I'm Goku.`,
        source: "Son Goku",
        citation: "Dragonball",
        year: false
    },

    {
        quote: `Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked. But it’s not like this compulsive need like my need to be praised.`,
        source: "Michael Scott",
        citation: "The Office",
        year: false
    }

];

const maxQuotes = quotes.length; //To establish number of total quotes available -TO AVOID NEW-CYCLE REPETITION-
let usedQuotes = []; //Array to dump used quote objects -TO AVOID IN-CYCLE REPETITION-
let lastQuote = ''; //Used to identify last quote available and used from the original quotes pool -TO AVOID NEW-CYCLE REPETITION-

//Picks random quote from the list above
function getRandomQuote() {
    let selectedQuote; //Initialize anchor for Selected Quote Object
    let selectedUsedQuote; //Initialize anchor for Selected USED Quote Object [For when there are 0 quotes available and NEW CYCLE starts]

    if ( quotes.length > 0 ) { //Executes while there are any quotes in the original quotes array

        let randomNum = Math.floor(Math.random() * quotes.length); //Return ARRAY INDEX No. between 0 and 1 LESS than the No. of items in Quotes Array
        selectedQuote =  quotes[randomNum]; //Lock in random quote according to array's index number

        
        
        /* THIS IS MY SOLUTION TO AVOID REPETITIONS BETWEEN CYCLES [WHEN ALL QUOTES ARE USED AND NEED TO BE RELOADED BACK INTO ORIGINAL QUOTE ARRAY] */
        /*Executes at NEW CYCLE when the quote array is RELOADED to original No. of objects AND the last quote used is the same as the new quote selected*/

        if (selectedQuote.quote === lastQuote.quote && quotes.length === maxQuotes ) { 
            console.log('BETWEEN CYCLE REPETITION DETECTED!'); //Warns the console that the selected quotes are the same in between cycles
            if ( randomNum === (maxQuotes - 1) ) { //If the index number of repeated quote happens to be the highest, reduce the number
                randomNum --; 
                console.log(`Index No. max, choosing quote below. New index: ${randomNum}`);
                selectedQuote =  quotes[randomNum];
            } else { //If the index number of repeated quote is anything below the highest possible, then add
                randomNum++; 
                console.log(`Index No. below max, choosing quote above. New index: ${randomNum}`);
                selectedQuote =  quotes[randomNum];
            }
        }

        let usedIndex = quotes.indexOf(selectedQuote); //Initialize anchor to establish the index number of the chosen quote object from the quotes array
        usedQuotes.push(selectedQuote); //Add selected quote to USED Quotes pool
        quotes.splice(usedIndex, 1); //Remove seleced quote from Quotes pool *HAD TO LOOK THIS UP FROM MDN*

        return selectedQuote;
    }

    //Executes when there are no quotes left in the original Quotes array / last quote available...
    let randomNum = Math.floor(Math.random() * usedQuotes.length);
    selectedUsedQuote = usedQuotes[randomNum]; //Select quote from the now full USED quotes array using same randomizer
    lastQuote = selectedUsedQuote; //Save the selected quote as the LAST QUOTE USED to avoid repetitions between cycles

    quotes = [...usedQuotes]; //re-fill Quotes
    usedQuotes = []; //empty usedQuotes
    console.log('NEW CYCLE ALERT');
    return selectedUsedQuote; //Returns non-previously selected quote from quote collection
}

function printQuote() {

    let chosenQuote = getRandomQuote(); //Define default HTML string without citation & year
        htmlString =
        `
            <p class="quote">${chosenQuote.quote}</p>
            <p class="source">${chosenQuote.source}</p>
        `;


    if ( chosenQuote.citation ) { //Define HTML string with citation
        htmlString = 
        `
            <p class="quote">${chosenQuote.quote}</p>
            <p class="source">${chosenQuote.source}<span class="citation">${chosenQuote.citation}</span></p>
        `;
    }

    if ( chosenQuote.year ) { //Define HTML string with citation AND year
        htmlString =
        `
            <p class="quote">${chosenQuote.quote}</p>
            <p class="source">${chosenQuote.source}<span class="citation">${chosenQuote.citation}</span><span class="year">${chosenQuote.year}</span></p>
        `;

    }
    console.log(`Quotes available: ${quotes.length}`); //Alert console how many quotes are available in the original quotes array
    console.log(`Quotes used: ${usedQuotes.length}`); //Alert console how many quotes have been added to the USED quotes array
    return document.getElementById('quote-box').innerHTML = htmlString; //inject our HTML string to the index document
}


/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);
