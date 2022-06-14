import express, { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import debug from 'debug';

import { Exception } from '../models/exception.js';
import { handleError, sanitize } from '../helpers/routing.js';
import { getDeeplink, getToken } from '../helpers/zoom-api.js';

import session from '../session.js';

import { appName } from '../config.js';

const dbg = debug(`${appName}:auth`);

const router = express.Router();

const codeMin = 32;
const codeMax = 64;
const stateMax = 1024;

// Validate the Authorization Code sent from Zoom
const validateQuery = [
    query('code')
        .isString()
        .withMessage('code must be a valid string')
        .isLength({ min: codeMin, max: codeMax })
        .withMessage(`code must be > ${codeMin} and < ${codeMax} chars`)
        .escape(),
    query('state')
        .optional()
        .isString()
        .withMessage('state must be a string')
        .isLength({ max: stateMax })
        .withMessage(`state must be < ${stateMax} chars`)
        .escape(),
];

/*
 * Redirect URI - Zoom App Launch handler
 * The user is redirected to this route when they authorize your server
 */
const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // sanitize code and state query parameters
        await sanitize(req);

        const code = req.query.code;

        // we have to check the type for TS so let's add an error too
        if (typeof code !== 'string') {
            const e = new Exception('invalid code parameter received', 400);
            return next(handleError(e));
        }

        // get Access Token from Zoom
        const { access_token: accessToken } = await getToken(code);

        // fetch deeplink from Zoom API
        const deeplink = await getDeeplink(accessToken);

        // redirect the user to the Zoom Client
        res.redirect(deeplink);
    } catch (e: unknown) {
        if (!(e instanceof Exception)) return dbg(e);
        return next(handleError(e));
    }
};

router.get('/', session, validateQuery, authHandler);

export default router;
