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

import {Element as PolymerElement} from "/poly_modules/@polymer/polymer/polymer-element.js"

class IgarLocalizer extends PolymerElement {
  constructor() {
    super();

    this._onChanged = this._onChanged.bind(this);
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  ready() {
    super.ready();

    // todo: app should be displayed in the client language by default when available. English otherwise
    this.language = 'jp';
  }

  static get properties() {
    return {
      language: {
        type: String,
        notify: true,
        reflectToAttribute: true
      }
    }
  }

  static get observedAttributes() {
    return ['language'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'language':
        this.language = newValue;
        break;
    }
  }

  _onChanged () {

  }
}

customElements.define('igar-localizer', IgarLocalizer);
