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

class SCView extends HTMLElement {

  createdCallback () {
    this._view = null;
    this._isRemote = (this.getAttribute('remote') !== null);
  }

  get route () {
    return this.getAttribute('route') || null;
  }

  _hideSpinner () {
    this.classList.remove('pending');
  }

  _showSpinner () {
    this.classList.add('pending');
  }

  _loadView (data) {
    // Wait for half a second then show the spinner.
    const spinnerTimeout = setTimeout(_ => this._showSpinner(), 500);

    this._view = new DocumentFragment();
    const xhr = new XMLHttpRequest();

    xhr.onload = evt => {
      const newDoc = evt.target.response;
      const newView = newDoc.querySelector('sc-view.visible');

      // Copy in the child nodes from the parent.
      newView.childNodes.forEach(node => {
        this._view.appendChild(node);
      });

      // Add the fragment to the page.
      this.appendChild(this._view);

      // Clear the timeout and remove the spinner if needed.
      clearTimeout(spinnerTimeout);
      this._hideSpinner();
    };
    xhr.responseType = 'document';
    xhr.open('GET', `${data[0]}?partial=`);
    xhr.send();
  }

  in (data) {
    if (this._isRemote && !this._view) {
      this._loadView(data);
    }

    return new Promise((resolve, reject) => {
      const onTransitionEnd = () => {
        this.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      };

      this.classList.add('visible');
      this.addEventListener('transitionend', onTransitionEnd);
    });
  }

  out () {
    return new Promise((resolve, reject) => {
      const onTransitionEnd = () => {
        this.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      };

      this.classList.remove('visible');
      this.addEventListener('transitionend', onTransitionEnd);
    });
  }

  update () {
    return Promise.resolve();
  }
}

document.registerElement('sc-view', SCView);
