#!/usr/bin/env node

/**
 * Iwami Ginzan AR, AR tour guide through the world heritage site Iwami Ginzan
 * Copyright (C) 2017  Michael Vogt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by

 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const express = require('express');
const fs = require('mz/fs');
const dot = require('dot');
const crypto = require('crypto');
const compression = require('compression');

const appData = require('./data/serverdata.json');

// Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
const toplevelSection = /([^/]*)(\/|\/index.html)$/;

const contentTemplate = 'app/templates/content.html';
const appShell = 'app/templates/shell.html';

const encoding = 'utf-8';
const homeItem = 'home';
const A04Item = '404';

const isPartialForRequest = (query) => 'partial' in query;

// Settings for dot template engine. Set [[]] as limiters to allow mustache bindings
const renderOptions = {
  useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
  defineParams: /^\s*([\w$]+):([\s\S]+)/,
  varname: "it",
  doNotSkipEncoded: false,
  evaluate: /\[\[([\s\S]+?)]]/g,
  interpolate: /\[\[=([\s\S]+?)]]/g,
  encode: /\[\[!([\s\S]+?)]]/g,
  use: /\[\[#([\s\S]+?)]]/g,
  define: /\[\[##\s*([\w\.$]+)\s*(:|=)([\s\S]+?)#]]/g,
  conditional: /\[\[\?(\?)?\s*([\s\S]*?)\s*]]/g,
  iterate: /\[\[~\s*(?:]]|([\s\S]+?)\s*:\s*([\w$]+)\s*(?::\s*([\w$]+))?\s*]])/g,
  strip: false,
  append: true,
  selfcontained: false
};

const app = express();
app.use(compression());

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
app.use(redirectToHTTPS([/localhost:(\d{4})/, /192.168.(.*)/], []));

// General handler for page requests
app.get(toplevelSection, async (req, res) => {
  // root files are in the home folder
  const item = req.params[0] === '' ? homeItem : req.params[0];

  let dataForItem = appData[item];
  if (!dataForItem) {
    dataForItem = _prepare404(req.url, res);
  }

  const isPartial = isPartialForRequest(req.query)
  const templates = await _getTemplatesToLoad(dataForItem, isPartial);
  const content = await _renderTemplates(templates, dataForItem, isPartial);

  // Let's use sha256 as a means to get an ETag
  _setETag(content, res);
  res.send(content);
});

app.use(express.static('app'));
app.use('/poly_modules', express.static('polymer/node_modules', {maxAge: '30 days'}));

// For now all routes are folder url's. file url's are all handled as 404 errors
app.use(async (req, res, next) => {
  const dataForItem = _prepare404(req.url, res);
  const isPartial = isPartialForRequest(req.query);
  const templates = await _getTemplatesToLoad(dataForItem, isPartial);
  const content = await _renderTemplates(templates, dataForItem, isPartial);

  _setETag(content, res);
  res.send(content)
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});


async function _getTemplatesToLoad(dataForItem, isPartial) {
  let filesToLoad = [fs.readFile(dataForItem.template)];

  if (!isPartial) {
    filesToLoad.push(fs.readFile(appShell));
  }

  try {
    const files = await Promise.all(filesToLoad)
    return await files.map(file => file.toString(encoding));
  } catch (e) {
    console.error(e.stack);
  }
}

async function _renderTemplates(templates, dataForItem, isPartial) {
  if (isPartial) {
    return dot.template(templates[0], renderOptions)(dataForItem);
  }

  dataForItem.maincontent = dot.template(templates[0], renderOptions)(dataForItem);
  return dot.template(templates[1], renderOptions)(dataForItem);
}

function _prepare404(url, res) {
  res.status(404);
  let dataForItem = appData[A04Item];
  dataForItem.url = url;

  return dataForItem;
}

function _setETag(content, res) {
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  res.set({'ETag': hash, 'Cache-Control': 'public, no-cache'});
}

app.listen(process.env.PORT || 3000);
