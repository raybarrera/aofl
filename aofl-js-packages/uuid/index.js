/**
 * Generates uuid like random values
 *
 * @version 1.0.0
 * @module aofl-js/uuid-package
 * @author Arian Khosravi <arian.khosravi@aofl.com>
 */

export const uuid = (placeholder) => {
  if (placeholder) {
    return (placeholder ^ Math.random() * 16 >> placeholder / 4).toString(16);
  }

  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
};
