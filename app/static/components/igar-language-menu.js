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

import {Element as PolymerElement} from "/node_modules/@polymer/polymer/polymer-element.js"
import "/node_modules/@polymer/paper-item/paper-item.js";
import "/node_modules/@polymer/paper-listbox/paper-listbox.js";

import {langMenu} from "/static/data/shelldata.js"

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
      <paper-listbox" selected="{{langselected}}" attr-for-selected="lang">
        <paper-item lang="jp">${langMenu.jp}</paper-item>
        <paper-item lang="zh">${langMenu.zh}</paper-item>
        <paper-item lang="en">${langMenu.en}</paper-item>
        <paper-item lang="de">${langMenu.de}</paper-item>
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
      langselected: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false,
      }
    }
  }

  static get observedAttributes() {return ['opened', 'langselected']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'opened':
        // todo: open/close menu
    }
  }
}

customElements.define('igar-language-menu', IgarLanguageMenu);
