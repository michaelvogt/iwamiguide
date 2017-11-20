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

export const appMenu = [
      {name: 'welcome', route: '/', title: 'ようこそ', sub: [
        {name: 'tutorial', route: '/home/tutorial/', title: 'チュートリアル'}
      ]},
      {name: 'jinyatour', route: '/jinyatour/', title: '陣屋ツアー', sub: [
        {name: 'jinya', route: '/jinyatour/jinya/', title: '陣屋'},
        {name: 'kigamishrine', route: '/jinyatour/kigamishrine/', title: '城上神社'},
        {name: 'nagaya', route: '/jinyatour/nagaya/', title: '中原長屋'},
        {name: 'okake', route: '/jinyatour/okake/', title: 'おかけ'},
        {name: 'idoshrine', route: '/jinyatour/idoshrine/', title: '井戸神社'},
        {name: 'kumagaike', route: '/jinyatour/kumagaike/', title: '熊谷家'},
        {name: 'shogenji', route: '/jinyatour/shogenji/', title: '勝源寺'}
      ]},
      {name: 'locations', route: '/locations/', title: '場所', sub: [
        {name: 'sahimayamashrine', route: '/locations/sahimeyamashrine/', title: '佐毘売山神社'},
        {name: 'kanseontemple', route: '/locations/kanseontemple/', title: '観世音寺'},
        {name: 'townscape', route: '/locations/townscape/', title: '町並み'},
        {name: 'bakery', route: '/locations/bakery/', title: 'ベーカリー'},
        {name: 'kamayashaft', route: '/locations/kamayashaft/', title: '釜屋間歩'}
      ]},
      {name: 'contact', route: '/contact/', title: 'お問い合わせ'}
    ];

export const langMenu =
    [{region: 'jp', title: '日本語'},
      {region: 'zh', title: '中文'},
      // {region: 'ko', title: '한국어'},  not enough space right now
      {region: 'en', title: 'EN'},
      {region: 'de', title: 'DE'}
    ];



export const appInfo = {title: '石見銀山ARガイド'};

export const hiddenSetting = [
      {id: 'usear', title: 'Enable AR'},
      {id: 'onlocation', title: 'On Location'}
    ];