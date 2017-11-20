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

class SCView extends HTMLElement {

  constructor() {
    super();

    this._view = null;
    this._isRemote = (this.getAttribute('remote') !== null);
  }

  get route() {
    return this.getAttribute('route') || null;
  }

  _hideSpinner() {
    this.classList.remove('pending');
  }

  _showSpinner() {
    this.classList.add('pending');
  }

  _logError(error) {
    console.log('Looks like there was a problem: \n', error);
  }

  _validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  _responseAsText(response) {
    return response.text();
  }

  _loadView(data) {
    // Wait for half a second then show the spinner.
    const spinnerTimeout = setTimeout(_ => this._showSpinner(), 500);

    fetch(`${data[0]}?partial=`)
        .then(this._verifyResponse)
        .then(this._responseAsText)
        .then((text) => {
          this.innerHTML = text;

          // Clear the timeout and remove the spinner if needed.
          clearTimeout(spinnerTimeout);
          this._hideSpinner();
        })
        .catch(this._logError);
  }

  in(data) {
    if (this._isRemote && !this._view) {
      this._loadView(data);
    }

    return new Promise((resolve, reject) => {
      const onTransitionEnd = () => {
        this.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      };

      this.classList.add('visible');
      this.classList.remove('shrink');
      this.addEventListener('transitionend', onTransitionEnd);
    });
  }

  out() {
    return new Promise((resolve, reject) => {
      const onTransitionEnd = () => {
        this.removeEventListener('transitionend', onTransitionEnd);
        this.classList.add('shrink');
        resolve();
      };

      this.classList.remove('visible');
      this.addEventListener('transitionend', onTransitionEnd);
    });
  }

  update(data) {
    // todo: for now just load the data, because page content isn't decided, yet
    if (this._isRemote && !this._view) {
      this._loadView(data);
    }

    return Promise.resolve();
  }
}

customElements.define('sc-view', SCView);