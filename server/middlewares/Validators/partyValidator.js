import database from '../../models/database';

const { pool } = database;

const partyValidator = (req, res, next) => {
    let {
        name, hqAddress, logoUrl
    } = req.body;
    if (!name || typeof (name) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid name' });
    }
    if (!hqAddress || typeof (hqAddress) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid hqAddress' });
    }
    if (!logoUrl || typeof (logoUrl) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid logoUrl' });
    }
    req.body.name = name.replace(/\s+/g, ' ').trim();
    req.body.hqAddress = hqAddress.replace(/\s+/g, ' ').trim();
    req.body.logoUrl = logoUrl.replace(/\s+/g, ' ').trim();
    next();
}


export default partyValidator;