/*
 * Copyright 2015 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of perseo-fe
 *
 * perseo-fe is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * perseo-fe is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with perseo-fe.
 * If not, see http://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[contacto@tid.es]
 */
'use strict';

var rules = require('../models/rules'),
    config = require('../../config'),
    myutils = require('../myutils');

function GetAllRules(req, resp) {
    rules.FindAll(req.tenant, req.service, function(err, data) {
        myutils.respond(resp, err, data);
    });
}
function GetRules(req, resp) {
    var rule = {
        name: req.params.id,
        service: req.service,
        tenant: req.tenant
    };
    rules.Find(rule, function(err, data) {
        myutils.respond(resp, err, data);
    });
}
function PostRules(req, resp) {
    req.body = req.body || {};
    req.body.service = req.service;
    req.body.tenant = req.tenant;
    rules.Save(req.body, function(err, data) {
        myutils.respond(resp, err, data);
    });
}
function DelRules(req, resp) {
    var rule = {
        name: req.params.id,
        service: req.service,
        tenant: req.tenant
    };
    rules.Remove(rule, function(err, data) {
        //200, it includes entity
        myutils.respond(resp, err, data);
    });
}

function AddTo(app) {
    app.get(config.endpoint.rulesPath, GetAllRules);
    app.get(config.endpoint.rulesPath + '/:id', GetRules);
    app.post(config.endpoint.rulesPath, PostRules);
    app.delete(config.endpoint.rulesPath + '/:id', DelRules);

}

/**
 * AddTo adds path and handler function to the Express app.
 *
 *  @param {Object}  Express application
 */
module.exports.AddTo = AddTo;


