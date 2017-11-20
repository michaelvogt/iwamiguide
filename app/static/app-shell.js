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

import "/poly_modules/@polymer/app-layout/app-drawer/app-drawer.js";
import "/poly_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "/poly_modules/@polymer/app-layout/app-header/app-header.js";
import "/poly_modules/@polymer/app-layout/app-header-layout/app-header-layout.js";
import "/poly_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js";
import "/poly_modules/@polymer/app-layout/app-toolbar/app-toolbar.js";
import '/poly_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import "/poly_modules/@polymer/iron-icons/iron-icons.js";
import "/poly_modules/@polymer/iron-media-query/iron-media-query.js";
import "/poly_modules/@polymer/paper-item/paper-item.js";
import "/poly_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "/poly_modules/@polymer/paper-icon-button/paper-icon-button.js";
import "/poly_modules/@polymer/paper-listbox/paper-listbox.js";
import "/poly_modules/@polymer/paper-tabs/paper-tabs.js";

import "/static/components/sc-router.js";
import "/static/components/igar-hidden-setting.js"
import "/static/components/igar-language-menu.js"
import "/static/components/igar-tabs-menu.js"
import "/static/components/igar-list-menu.js"
import "/static/components/igar-localizer.js"

import {appMenu, langMenu, appInfo} from "/data/shelldata.js"

// import "./my-icons.js";

class AppShell extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    // language=HTML
    return `
            <style>
              :host { 
                --app-primary-color: #20c020;
                --app-secondary-color: #f09010;
                
                --header-height: 212px;
                
                --bright-text-color: #fff;
                --menu-gradient: linear-gradient(rgba(0,0,0, 0), rgba(0,0,0, .8));
                --menu-selected-gradient: linear-gradient(rgba(255,255,255, 0), rgba(255,255,255, .8));
                
                --app-drawer-content-container: {
                  display: flex;
                  flex-direction: column;
                }
              }
        
              app-header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: var(--header-height);
                color: var(--bright-text-color);
                background-color: var(--app-primary-color);
                /* https://bugs.chromium.org/p/chromium/issues/detail?id=637072 */
                --app-header-background-front-layer: {
                  background-image: url("/static/media/header.jpg");
                  background-position: left center;
                };
              }      
                
              app-header paper-icon-button {
                --paper-icon-button-ink-color: #333;
              }
                              
              .main-header {
                box-shadow: 0 5px 6px -3px rgba(0, 0, 0, 0.4);
              }
              
              #menu-title {
                margin-top: 20px;
              }
              
              #menu-title div[main-title] {
                display: inline-block;
              }
              
              #menu-bar {
                grid-column: 1 / -1;
                
                display: grid;
                height: var(--header-height);
                color: var(--bright-text-color);
                background: var(--app-secondary-color) url("/static/media/stones.jpg") no-repeat left top;
                                               
                --paper-item: {
                  margin-left: 5px;
                }               
              }
              
              #menu-bar igar-hidden-setting {
                align-self: end;
              }
              
              #title-bar, #menu-title {
                height: 80px;
                font-weight: bold;
              }
              
              #menu-title .menu-button {
                left: 16px;
                margin-right: 5px;
              }
              
              #menu-list {
                flex: 1 0 100px;
                overflow-y: auto;
              }
              
              #menu-list  {
                --paper-item-min-height: 30px;
              }
              
              .language-list {
                align-self: flex-end;
              
                --paper-listbox-color: --bright-text-color;
                --paper-listbox-background-color: rgba(0,0,0,0);
              }
                            
              app-toolbar#tabs-bar {
                position: absolute;
                bottom: 0;
                width: 100vw;
                height: 32px;
                background: var(--menu-gradient)
              }
              
              paper-tabs {
                --paper-tabs-selection-bar-color: black;
                height: 100%;
              }
              
              paper-tab {
                --paper-tab-ink: #aaa;
                text-transform: uppercase;
              }
              
              [hidden] {
                display: none !important;
              }
            </style>
        
            <app-drawer-layout id="navmenu" fullbleed force-narrow>
              <!-- Drawer content -->
              <app-drawer id="drawer" slot="drawer" swipe-open="[[!wideLayout]]">         
                <header id="menu-bar" class="main-header">
                  <div id="menu-title" top-item>
                      <!-- drawer toggle button -->
                    <paper-icon-button class="menu-button" icon="close" drawer-toggle></paper-icon-button>
                    <div main-title>${appInfo.title}</div>
                  </div>
                  <igar-hidden-setting></igar-hidden-setting>
                </header>
          
                <!-- Nav on mobile -->
                <igar-list-menu id="menu-list" selected="{{route_selected}}" role="navigation"></igar-list-menu>
                <igar-language-menu 
                    class="language-list" selected="{{lang_selected}}" opened="true"></igar-language-menu>
              </app-drawer>
        
              <!-- Header content -->
              <app-header-layout>
                <app-header class="main-header" slot="header" condenses reveals 
                    effects="waterfall blend-background parallax-background">
                  <app-toolbar id="title-bar">
                    <paper-icon-button 
                        class="menu-button" icon="menu" drawer-toggle hidden$="{{wideLayout}}"></paper-icon-button>
                    <div main-title>${appInfo.title}</div>
                    
                    <igar-language-menu 
                        class="language-list" selected="{{lang_selected}}" hidden$="{{!wideLayout}}">
                    </igar-language-menu>
                  </app-toolbar>
                                      
                  <!-- Nav on desktop. Needs toolbar for scroll effect (?) -->
                  <app-toolbar id="tabs-bar" hidden$="{{!wideLayout}}">
                    <igar-tabs-menu selected="{{route_selected}}" bottom-item role="navigation"></igar-tabs-menu>
                  </app-toolbar>
                </app-header>
              
                <slot></slot>
              
              </app-header-layout>
            </app-drawer-layout>
          
            <iron-media-query query="min-width: 640px" query-matches="{{wideLayout}}"></iron-media-query>
            <sc-router id="router" route="{{route_selected}}"></sc-router>
            <igar-localizer language="{{lang_selected}}"></igar-localizer>`
  }

  static get properties() {
    return {
      route_selected: {
        type: String,
        notify: true,
        reflectToAttribute: true,
        observer: '_observeMenuSelected'
      },
      lang_selected: {
        type: String,
        notify: true,
        reflectToAttribute: true,
        observer: '_observeLangSelected'
      },
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
    };
  }

  ready() {
    super.ready();

    this.la
  }

  _observeMenuSelected() {
    this.$.drawer.close();
  }

  _observeLangSelected() {
    // todo: set language property and update displayed texts
  }
}

customElements.define('app-shell', AppShell);
