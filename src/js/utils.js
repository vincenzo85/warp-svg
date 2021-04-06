/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */

export function getTranslateValues (element) {
    const style = window.getComputedStyle(element)
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform
  
    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
      return {
        x: 0,
        y: 0,
        z: 0
      }
    }
  
    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
  
    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      }
    }
  
    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14]
      }
    }
}


export function getControlPoint() {
    var controlPoints = [];
    var controls_points = document.getElementsByClassName('control-point');
    for(let i = 0; i < controls_points.length; i++) {
      if(controls_points[i].hasAttribute("transform")) {
        const { x, y } = getTranslateValues(controls_points[i]);
        controlPoints.push([Number(x), Number(y)]);
      } else {
        controlPoints.push([controls_points[i].cx.animVal.value, controls_points[i].cy.animVal.value]);
      }
    }
    return controlPoints;
}

  