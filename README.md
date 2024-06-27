# wink-embeddings-sg-100d
**100-dimensional English word embeddings for wink-nlp**

[<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >](https://winkjs.org/)
This pre-trained 100-dimensional English word embedding set is specifically optimized for [winkNLP](https://github.com/winkjs/wink-nlp). This package (~110MB download, ~310MB installed) includes embeddings for over 350K English words. Boost accuracy in semantic similarity, text classification, and more – even in the browser.

## Getting Started

### Prerequisite
It requires Node.js `version 16.0.0` or above and winkNLP `version 2.1.0` or above.


### Installation
The model must be installed along with the [wink-nlp](https://github.com/winkjs/wink-nlp?tab=readme-ov-file#installation) and the [wink-eng-lite-web-model](https://github.com/winkjs/wink-eng-lite-web-model):

```sh
# Install wink-nlp
npm install wink-nlp --save
# Install wink-eng-lite-web-model
npm install wink-eng-lite-web-model --save
# Install wink-embeddings-sg-100d
npm install wink-embeddings-sg-100d --save
```

### Example
The code below computes the similarities between all pairs of four sentences by obtaining their vectors and using cosine similarity:

```javascript
// Load wink-nlp package.
const winkNLP = require( 'wink-nlp' );
// Load english language model.
const model = require( 'wink-eng-lite-web-model' );
// Load word embeddings.
const vectors = require( 'wink-embeddings-sg-100d' );
// Load similarity utility.
const similarity = require( 'wink-nlp/utilities/similarity.js' );

// Use only tokenization and sentence boundary detection pipe.
const nlp = winkNLP( model, [ 'sbd' ], vectors );
// Obtain "its" helper to extract item properties.
const its = nlp.its;
// Obtain "as" reducer helper to reduce a collection.
const as = nlp.as;
// The following text contains 4-sentences, where the first 
// two and the last two have high similarity.
const text = `The cat rested on the carpet. The kitten slept on the rug.
The table was in the drawing room. The desk was in the study room.`;
// This will hold the array of vectors for each sentence.
const v = [];
// This will hold sentence pairs and their similarities.
const similarities = [];
// Run the nlp pipe.
const doc = nlp.readDoc( text );
// Compute each sentence's embedding and fill in "v[i]".
// Only use words and ignore stop words.
doc
  .sentences()
  .each( ( s, k ) => {
    v[ k ] = s
      .tokens()
      .filter( (t) => (t.out(its.type) === 'word' && !t.out(its.stopWordFlag)))
      .out(its.value, as.vector);  
  })
// Compute & save similarity for all the pairs.
for ( let i = 0; i < v.length; i += 1 ) {
  for ( let j = 0; j < v.length; j += 1 ) {
      similarities.push( 
        {sentence1: `${i+1}. ${doc.sentences().itemAt( i ).out()}`, sentence2: `${j+1}. ${doc.sentences().itemAt( j ).out()}`, similarity: `${similarity.vector.cosine( v[ i ], v[ j ] ).toFixed( 2 )}`}
      );
  }
}
```
The output i.e. the `similarities` array, of the above example is visually illustrated below:
<table><tr><td>
    <img width="658" alt="wink-nlp-word-embeddings" src="https://github.com/winkjs/wink-embeddings-sg-100d/assets/29990/0e802d25-a243-4e81-bf48-713ddb8e8bc6">
</td></tr></table>

Explore more in the "[How to use word embedding with winkNLP?](https://observablehq.com/@winkjs/how-to-use-word-embedding-with-winknlp)" Observable notebook.

<br/>


## Need Help?
If you spot a bug and the same has not yet been reported, raise a new [issue](https://github.com/winkjs/wink-embeddings-sg-100d/issues).


## About winkJS
[WinkJS](https://winkjs.org/) is a family of open source packages for **Natural Language Processing**, **Machine Learning**, and **Statistical Analysis** in NodeJS. The code is **thoroughly documented** for easy human comprehension and has a **test coverage of ~100%** for reliability to build production grade solutions.

## Copyright & License

**Wink NLP** is copyright 2017-24 [GRAYPE Systems Private Limited](https://graype.in/).

It is licensed under the terms of the MIT License.
