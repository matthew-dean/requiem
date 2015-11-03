/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assert = require('../helpers/assert');
let toElementArray = require('../helpers/toElementArray');

/**
 * Removes a class(es) from DOM element(s).
 *
 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
 * @param {string|string[]}                             className
 *
 * @alias module:requiem~utils.removeClass
 */
function removeClass(element, className) {
  let elements = toElementArray(element);
  let classes = [];
  let n = elements.length;

  if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

  if (typeof className === 'string') {
    classes.push(className);
  }
  else {
    classes = className;
  }

  let nClasses = classes.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];

    for (let j = 0; j < nClasses; j++) {
      let c = classes[j];

      if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;

      let regex = new RegExp('^' + c + '\\s+|\\s+' + c, 'g');
      e.className = e.className.replace(regex, '');
    }
  }
}

module.exports = removeClass;
