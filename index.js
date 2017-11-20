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

const app = express();
app.use('/node_modules', express.static('node_modules'));
app.use('/poly_modules', express.static('polymer/node_modules'));

// Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
const toplevelSection = /([^/]*)(\/|\/index.html)$/;

// Settings for dot template engine
const renderOptions = {
  useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
  defineParams:/^\s*([\w$]+):([\s\S]+)/,
  varname:	"it",
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

// General handler for page requests
app.get(toplevelSection, (req, res) => {
    // Extract the menu item name from the path and attach it to
    // the request to have it available for template rendering.
    req.item = req.params[0];

    // The files for the home screen are stored in the folder 'home'
    const path = req.path === '/' ? '/home/' : req.path;

    // If the request has `?partial`, don't render header and footer.
    let files;
    if ('partial' in req.query) {
        files = [
          fs.readFile('app/templates/content.html'),
          fs.readFile('data/serverdata.json'),
        ];
    } else {
        files = [
          fs.readFile('app/templates/content.html'),
          fs.readFile('app/templates/shell.html'),
          fs.readFile('data/serverdata.json'),
        ];
    }

    Promise.all(files)
    .then( (files) => files.map( (f) => f.toString('utf-8')))
    .then( (files) => {
      if ( 'partial' in req.query) {
            return dot.template( files[0], renderOptions)(req);
        }

        req.pageContent = files[0];
        return dot.template( files[1], renderOptions)(req);
    })
    .then( (content) => {
        // Let's use sha256 as a means to get an ETag
        const hash = crypto
            .createHash('sha256')
            .update(content)
            .digest('hex');

        res.set({
            'ETag': hash,
            'Cache-Control': 'public, no-cache',
        });
        res.send( content);
    })
    .catch( (error) => res.status(500).send(error.toString()));
});

app.use(express.static('app'));
app.listen(process.env.PORT || 3000);
