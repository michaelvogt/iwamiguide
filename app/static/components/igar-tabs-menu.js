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

import {appMenu} from "/data/shelldata.js";

class IgarTabsMenu extends PolymerElement {
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
        paper-tabs {
          height: 32px;
        }
      </style>
      
      <paper-tabs selected="{{selected}}" attr-for-selected="route" scrollable sticky role="navigation">
          ${appMenu.map(item =>
            `<paper-tab raised name="${item.name}" route="${item.route}" role="menuitem">${item.title}</paper-tab>`
        ).join('')}
      </paper-tabs>`
  }

  static get properties() {
    return {
      selected: {
        type: String,
        notify: true,
        reflectToAttribute: true
      }
    }
  }

  static get observedAttributes() {return ['selected']; }
}

customElements.define('igar-tabs-menu', IgarTabsMenu);

