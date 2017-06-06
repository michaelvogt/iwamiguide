#!/usr/bin/env node

/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const express = require('express');
const fs = require('mz/fs');
const dot = require('dot');
dot.templateSettings.strip = false;

const crypto = require('crypto');

const app = express();
app.use('/node_modules', express.static('node_modules'));
// Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
const toplevelSection = /([^/]*)(\/|\/index.html)$/;
app.get(toplevelSection, (req, res) => {
  // Extract the menu item name from the path and attach it to
  // the request to have it available for template rendering.
  req.item = req.params[0];

  // If the request has `?partial`, don't render header and footer.
  let files;
  if ('partial' in req.query) {
    files = [fs.readFile(`app/${req.item}/index.html`)];
  } else {
    files = [
      fs.readFile('app/header.partial.html'),
      fs.readFile(`app/${req.item}/index.html`),
      fs.readFile('app/footer.partial.html')
    ];
  }

  Promise.all(files)
  .then(files => files.map(f => f.toString('utf-8')))
  .then(files => files.map(f => dot.template(f)(req)))
  .then(files => {
    const content = files.join('');
    // Let's use sha256 as a means to get an ETag
    const hash = crypto
                  .createHash('sha256')
                  .update(content)
                  .digest('hex');

    res.set({
      'ETag': hash,
      'Cache-Control': 'public, no-cache'
    });
    res.send(content);
  })
  .catch(error => res.status(500).send(error.toString()));
});
app.use(express.static('app'));

app.listen(process.env.PORT || 3000);