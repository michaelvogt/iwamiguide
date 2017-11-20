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

class IgarListMenu extends PolymerElement {
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
        .item {
          margin-top: 10px;
        }
        .subitem {
          margin-left: 10px;
        }
      </style>
      <paper-listbox selected="{{selected}}" attr-for-selected="route" role="menu">
        ${appMenu.map(item =>
          `<paper-item class="item" raised name="${item.name}" route="${item.route}" role="menuitem">
            ${item.title}
          </paper-item>
            ${item.sub ? item.sub.map(subItem =>
              `<paper-item raised class="subitem" name="${subItem.name}" route="${subItem.route}" role="menuitem">
                ${subItem.title}
              </paper-item>`
            ).join('') : ''}`
        ).join('')}
        </dl>
      </paper-listbox>`
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

customElements.define('igar-list-menu', IgarListMenu);

