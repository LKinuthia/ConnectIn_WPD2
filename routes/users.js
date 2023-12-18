const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


/* GET signup page. */
router.get('/signup', function (req, res) {
    res.send();
});

// call to require('express')

router.post('/signup', [check('name').exists().isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
check('classYear', 'Class Year should be a number').not().isEmpty().isInt(),
check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 }),
check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),

],
    function (req, res) {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        } else {
            res.status(200).json({ message: 'Submission is successful' });
        }
    });

module.exports = router;