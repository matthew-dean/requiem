/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assert = require('../helpers/assert');
let inherit = require('../helpers/inherit');
let log = require('../helpers/log');
let DirtyType = require('../types/DirtyType');
let Element = require('./Element');

/**
 * @class
 *
 * Controller of a DOM 'video' element.
 *
 * @extends module:requiem~ui.Element
 * @alias module:requiem~ui.Video
 */
function Video() {
  Video.__super__.constructor.apply(this, arguments);
} inherit(Video, Element);

/**
 * @static
 *
 * Constants for the 'preload' attribute.
 *
 * @type {Object}
 *
 * @see {@link http://www.w3schools.com/tags/tag_video.asp}
 */
Video.PRELOAD = {
  AUTO: 'auto',
  METADATA: 'metada',
  NONE: 'none'
};

/**
 * @inheritdoc
 */
Video.prototype.update = function() {
  if (this.updateDelegate.isDirty(DirtyType.DATA)) {
    this._updateSource();
  }

  if (this.updateDelegate.isDirty(DirtyType.CUSTOM)) {

  }

  Video.__super__.update.call(this);
};

/**
 * @inheritdoc
 */
Video.prototype.factory = function() {
  return document.createElement('video');
};

/**
 * Updates the sources in this Video instance.
 *
 * @private
 */
Video.prototype._updateSource = function() {
  let i;
  let arrlen;

  // Update source(s).
  let oldSources = this.element.getElementsByTagName('source');

  arrlen = oldSources.length;

  for (i = 0; i < arrlen; i++) {
    let oldSource = oldSources[i];

    this.element.removeChild(oldSource);
  }

  if (!this.source) return;

  arrlen = this.source.length;

  for (i = 0; i < arrlen; i++) {
    let newSource = document.createElement('source');
    let path = this.source[i].src;
    let type = this.source[i].type;
    let ext = path.split('.').pop();

    newSource.setAttribute('src', path);
    newSource.setAttribute('type', type || 'video/' + ext);

    this.element.appendChild(newSource);
  }
};

/**
 * @inheritdoc
 */
Video.prototype.toString = function() {
  return '[Video{' + this.name + '}]';
};

/**
 * @inheritdoc
 */
Video.prototype.__define_properties = function() {
  /**
   * Specifies that the video will start playing as soon as it is ready.
   *
   * @property {boolean}
   */
  Object.defineProperty(this, 'autoplay', {
    get: function() {
      return this.element.autoplay;
    },
    set: function(value) {
      this.element.autoplay = value;
      this.updateDelegate.setDirty(DirtyType.CUSTOM);
    }
  });

  /**
   * Specifies that video controls should be displayed (such as a play/pause
   * button etc).
   *
   * @property {boolean}
   */
  Object.defineProperty(this, 'controls', {
    get: function() {
      return this.element.controls;
    },
    set: function(value) {
      this.element.controls = value;
      this.updateDelegate.setDirty(DirtyType.CUSTOM);
    }
  });

  /**
   * Specifies that the video will start over again, every time it is
   * finished.
   *
   * @property {boolean}
   */
  Object.defineProperty(this, 'loop', {
    get: function() {
      return this.element.loop;
    },
    set: function(value) {
      this.element.loop = value;
      this.updateDelegate.setDirty(DirtyType.CUSTOM);
    }
  });

  /**
   * Specifies that the audio output of the video should be muted.
   *
   * @property {boolean}
   */
  Object.defineProperty(this, 'muted', {
    get: function() {
      return this.element.muted;
    },
    set: function(value) {
      this.element.muted = value;
      this.updateDelegate.setDirty(DirtyType.CUSTOM);
    }
  });

  /**
   * Specifies an image to be shown while the video is downloading, or until
   * the user hits the play button.
   *
   * @property {string}
   */
  Object.defineProperty(this, 'poster', {
    get: function() {
      return this.element.poster;
    },
    set: function(value) {
      this.element.poster = value;
      this.updateDelegate.setDirty(DirtyType.CUSTOM);
    }
  });

  /**
   * Specifies if and how the author thinks the video should be loaded when
   * the page loads
   *
   * @property {string}
   */
  Object.defineProperty(this, 'preload', {
    get: function() {
      return this.element.preload;
    },
    set: function(value) {
      this.element.preload = value;
      this.updateDelegate.setDirty(DirtyType.CUSTOM);
    }
  });

  /**
   * Array of sources containing elements in the form of:
   * Object {
   *   {string} src  - Path of source.
   *   {string} type - Type of source.
   * }
   *
   * @property {Object[]}
   */
  Object.defineProperty(this, 'source', {
    get: function() {
      return this._source;
    },
    set: function(value) {
      Object.defineProperty(this, '_source', {
        value: value,
        writable: true
      });
      this.updateDelegate.setDirty(DirtyType.DATA);
    }
  });

  Video.__super__.__define_properties.call(this);
};

/**
 * @inheritdoc
 */
Video.prototype.__set_element = function(value) {
  assert(value instanceof HTMLVideoElement, 'Invalid element type specified. Must be an instance of HTMLVideoElement.');
  Video.__super__.__set_element.call(this, value);
};

module.exports = Video;
