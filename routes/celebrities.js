const router = require('express').Router();
const {render} = require('../app');
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) =>{
    Celebrity.find()
        .then(celebritiesFromDB =>{
            console.log (celebritiesFromDB[0]._id);
            res.render('celebrities/index', {
            celebrities: celebritiesFromDB
        });
        
    })
    .catch(err =>{
        next(err);
    })

})

router.post('/celebrities', (req, res, next) =>{
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    })
        .then(createdCelebrity => {
            res.redirect(`/celebrities/${createdCelebrity._id}`);
        })
        .catch(err => next(err));
});


router.get ('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new');
    
});

router.post('/celebrities/:id', (req, res, next) =>{
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, { 
        name: name, 
        occupation: occupation, 
        catchPhrase: catchPhrase
    })
    .then(() =>{
        res.redirect('/celebrities');
    })
    .catch(err =>{
        next(err);
    });
});

router.post('/celebrities/:id/delete', (req, res , next) =>{
    Celebrity.findByIdAndDelete({_id: req.params.id})
        .then(() =>{
            res.redirect('/celebrities');
        })
    .catch(err =>{
        next(err);
    })
});

router.get('/celebrities/:id/edit', (req, res, next) =>{
    Celebrity.findById(req.params.id)
        .then(celebrity =>{
            res.render('celebrities/edit', {celebrity});
        })
        .catch(err =>{
            next(err);
        })
});

router.get('/celebrities/:id', (req, res, next) =>{
	// // const bookId = req.params.id;
    Celebrity.findById(req.params.id)
     .then(celebritiesFromDB =>{
        res.render('celebrities/show', {celebrity: celebritiesFromDB});
    })
    .catch(err =>{
        next(err);
    })
});

module.exports = router;