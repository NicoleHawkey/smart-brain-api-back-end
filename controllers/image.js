const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cb36b4e48506454ea45691a48f2b5fc0'
  }); 

const handleApiCall = (req, res) => {
    console.log('Input:', req.body.input);
    app.models.predict({
      id: 'face-detection',
      name: 'face-detection',
      version: '6dc7e46bc9124c5c8824be4822abe105',
      type: 'visual-detector'
    }, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(400).json('unable to work with API');
    });
  }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall
};