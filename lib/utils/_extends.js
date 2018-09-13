'use strict';

module.exports = _extends;

/**
 * Prototype inheritance
 * @param {*} Child child object that extends the parent
 * @param {*} Parent parent object to inherits from
 */
function _extends(Child, Parent) {
  const parentProto = Parent.prototype;
  Child.prototype = Object.create(parentProto);
  Child.prototype.constructor = Child;
}