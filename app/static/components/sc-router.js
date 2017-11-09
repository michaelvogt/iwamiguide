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

class SCRouter extends PolymerElement {
  constructor () {
    super();

    this._onChanged = this._onChanged.bind(this);
    this._routes = new Map();
  }

  connectedCallback () {
    window.addEventListener('popstate', this._onChanged);
    this._clearRoutes();
    this._addRoutes();
    this._onChanged();
  }

  disconnectedCallback () {
    window.removeEventListener('popstate', this._onChanged);
  }

  static get properties() {
    return {
      selected: {
        type: String,
        notify: true,
        reflectToAttribute: true
      },
    }
  }

  static get observedAttributes() {return ['selected']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'selected':
        this.go(newValue);
    }
  }

  _onChanged () {
    const path = window.location.pathname;
    const routes = Array.from(this._routes.keys());
    const route = routes.find(r => r.test(path));
    const data = route.exec(path);

    if (!route) {
      return;
    }

    // Store the new view.
    this._nextView = this._routes.get(route);

    // We don't want to create more promises for the outgoing view animation,
    // because then we get a lot of hanging Promises, so we add a boolean gate
    // here to stop if there's already a transition running.
    if (this._isTransitioningBetweenViews) {
      return Promise.resolve();
    }
    this._isTransitioningBetweenViews = true;

    // Assume that there's no outgoing animation required.
    let outViewPromise = Promise.resolve();

    // If there is a current view...
    if (this._currentView) {
      // ...and it's the one we already have, just update it.
      if (this._currentView === this._nextView) {
        // No transitions, so remove the boolean gate.
        this._isTransitioningBetweenViews = false;

        return this._currentView.update(data);
      }

      // Otherwise animate it out, and take the Promise made by the view as an
      // indicator that the view is done.
      outViewPromise = this._currentView.out(data);
    }

    // Whenever the outgoing animation is done (which may be immediately if
    // there isn't one), update the references to the current view, allow
    // outgoing animations to proceed.
    return outViewPromise
      .then(_ => {
        this._currentView = this._nextView;
        this._isTransitioningBetweenViews = false;
        return this._nextView.in(data);
      });
  }

  go (url) {
    window.history.pushState(null, '', url);
    return this._onChanged();
  }

  addRoute (route, view) {
    if (this._routes.has(route))
      return console.warn(`Route already exists: ${route}`);

    this._routes.set(route, view);
  }

  _addRoutes () {
    let views = Array.from(document.querySelectorAll('sc-view'));
    views.forEach(view => {
      if (!view.route)
        return;

      this.addRoute(new RegExp(view.route, 'i'), view);
    }, this);
  }

  _removeRoute (route) {
    this._routes.delete(route);
  }

  _clearRoutes () {
    this._routes.clear();
  }
}

customElements.define('sc-router', SCRouter);