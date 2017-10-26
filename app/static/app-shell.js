/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  Element as PolymerElement
}
  from "../../node_modules/@polymer/polymer/polymer-element.js"

import "../../node_modules/@polymer/app-layout/app-drawer/app-drawer.js";
import "../../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "../../node_modules/@polymer/app-layout/app-header/app-header.js";
import "../../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js";
import "../../node_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js";
import "../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js";
import "../../node_modules/@polymer/iron-selector/iron-selector.js";
import "../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";

// import "./my-icons.js";

export class AppShell extends PolymerElement {
  constructor() {
    super();

    this._internalizeLinks = this._internalizeLinks.bind(this);
  }

  static get template() {
    return `
            <style>
              :host {
                --app-primary-color: #4285f4;
                --app-secondary-color: black;
        
                display: block;
              }
        
              app-drawer-layout:not([narrow]) [drawer-toggle] {
                display: none;
              }
        
              app-header {
                color: #fff;
                background-color: var(--app-primary-color);
              }
        
              app-header paper-icon-button {
                --paper-icon-button-ink-color: white;
              }
        
              .drawer-list {
                margin: 0 20px;
              }
        
              .drawer-list a {
                display: block;
                padding: 0 16px;
                text-decoration: none;
                color: var(--app-secondary-color);
                line-height: 40px;
              }
        
              .drawer-list a.iron-selected {
                color: black;
                font-weight: bold;
              }
            </style>
        
            <app-drawer-layout fullbleed narrow="{{narrow}}">
              <!-- Drawer content -->
              <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
                <app-toolbar>Menu</app-toolbar>
                <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                  <a name="home" href="/">Home</a>
                  <a name="misc" href="/misc/">Misc</a>
                  <a name="about" href="/about/">About</a>
                  <a name="contact" href="/contact/">Contact</a>
                </iron-selector>
              </app-drawer>
        
              <!-- Main content -->
              <app-header-layout has-scrolling-region>
        
                <app-header slot="header" condenses reveals effects="waterfall">
                  <app-toolbar>
                    <paper-icon-button icon="my-icons:menu" drawer-toggle></paper-icon-button>
                    <div main-title> 石見銀山ARガイド</div>
                  </app-toolbar>
                </app-header>
                
                <slot></slot>
        
              </app-header-layout>
            </app-drawer-layout>`
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: String,
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  ready() {
    super.ready();
    window.requestAnimationFrame(this._internalizeLinks);
  }

  _internalizeLinks() {
    const router = document.querySelector('sc-router');
    const links = Array.from(this.$.drawer.querySelectorAll('a'));

    function onClick (evt) {
      evt.preventDefault();
      router.go(evt.target.href);
    }

    links.forEach(link => {
      link.addEventListener('click', onClick);
    });
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'view1' in that case.
    this.page = page || 'view1';

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    const resolvedPageUrl = this.resolveUrl('my-' + page + '.html');

    /*
    // Not available in Polymer 3
    Polymer.importHref(
        resolvedPageUrl,
        null,
        this._showPage404.bind(this),
        true);
    */

/*
    import(`./my-${page}.js`).then((myView1) => {
      console.log(`My-${page} loaded`);
      //module.loadPageInto(main);
    }).catch((reason) => {
      console.log("MyView1 failed to load", reason);
    });
*/
  }

  _showPage404() {
    this.page = 'view404';
  }
}

customElements.define('app-shell', AppShell);
