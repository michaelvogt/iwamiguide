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
import "/node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "/node_modules/@polymer/paper-item/paper-item.js";
import "/node_modules/@polymer/paper-listbox/paper-listbox.js";

class IgarSettingMenu extends PolymerElement {
  constructor () {
    super();
  }

  connectedCallback () {

  }

  disconnectedCallback () {

  }

  static get template() {
    return `
      <style>
        :host {
          --paper-dropdown-menu-input: {
            visibility: hidden;
          };
          
          --paper-dropdown-menu-icon: {
            color: #eee;
            padding: 0;
          }
        };
        
        paper-dropdown-menu {
          width: 100%;
          background: var(--menu-gradient);
        }
        
        #usear, #onlocation {
          width: 250px;
        }
      </style>
      
      <paper-dropdown-menu id="menu" on-value-changed="_handleValueChange">
        <paper-listbox slot="dropdown-content" multi 
            attr-for-selected="id" selected="{{setting}}" fallback-selection="None">
          <paper-item id="usear">Enable AR</paper-item>
          <paper-item id="onlocation">On location</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>`
  }

  static get properties() {
    return {
      usear: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false,
      },
      onlocation: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false,
      },
    }
  }

  ready() {
    super.ready();
    this.$.menu.horizontalAlign = 'left';
  }

  _handleValueChange( event, data, test) {
    const attribute = event.path[event.path.length - 1].activeElement.id;
    switch (attribute) {
      case 'usear':
        this._updateUseAR( data.value.length > 0);
        break;
      case 'onlocation':
        this._updateOnLocation( data.value.length > 0);
        break;
      default:
        console.log('empty')
    }
  }

  _updateOnLocation(state) {
    this.onLocation = state;
    // todo: update site content
  }

  _updateUseAR(state) {
    this.useAR = state;
    // todo: update site content
  }

  static get observedAttributes() {return ['usear', 'onlocation']; }
}

customElements.define('igar-setting-menu', IgarSettingMenu);
