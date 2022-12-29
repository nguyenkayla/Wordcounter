class WordCounter {
  constructor(inputText) {
      this.inputText = inputText;
      this.inputText.addEventListener('input', () => {
        this.count(); // will execute every time the input event occurs
        });
  }
  
  count() { // calls to calculate the number of words and characters of the inputText element
      let wordStat = this.getWordStat(this.inputText.value.trim());
      this.emitEvent(wordStat);
  }

  emitEvent(wordStat) { // create count event
      let countEvent = new CustomEvent('count', {
          bubbles: true,
          cancelable: true,
          detail: {
              wordStat
          }
      });
      // dispatch the count event
      this.inputText.dispatchEvent(countEvent);

    }
  
  getWordStat(str) {
      let matches = str.match(/\S+/g); //return the number words of a string
      return {
          characters: str.length,
          words: matches ? matches.length : 0,
       };
    }
}
const inputText = document.querySelector('#text');
const statElem = document.querySelector('#stat');

// create a new instance of WordCounter
new WordCounter(inputText);

const render = (event) => {
  statElem.innerHTML = `<p>You've written <span class="highlight">${event.detail.wordStat.words} words</span> 
      and <span class="highlight">${event.detail.wordStat.characters} characters</span>.</p>`;
}

inputText.addEventListener('count', render);
