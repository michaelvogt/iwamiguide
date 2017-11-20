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
import "/poly_modules/@polymer/paper-item/paper-item.js";
import "/poly_modules/@polymer/paper-listbox/paper-listbox.js";
import "/poly_modules/@polymer/iron-flex-layout/iron-flex-layout.js";

import {langMenu} from "/data/shelldata.js"

// todo: space is not available on the page to show all languages. Provide a
class IgarLanguageMenu extends PolymerElement {
  constructor() {
    super();
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  static get template() {
    return `
      <style>  
        paper-listbox {
          @apply(--layout-horizontal);
          @apply(--layout-around-justified);
        }        
      </style>
      
      <paper-listbox id='list' selected="{{langselected}}" attr-for-selected="lang">
        ${langMenu.map(item =>
          `<paper-item lang="${item.region}">${item.title}</paper-item>`
        ).join('')}
      </paper-listbox>`;
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false,
      },
      selected: {
        type: String,
        notify: true,
        reflectToAttribute: true,
      }
    }
  }

  static get observedAttributes() {return ['opened', 'selected']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'opened':
        // todo: open/close menu
        break;
      case 'selected':
        this.langselected = newValue;
    }
  }
}

customElements.define('igar-language-menu', IgarLanguageMenu);
