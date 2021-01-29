// convert formatter to result
export const parseFormatter = (template, data) => {
  return template.replace(/\{\{(.+?)\}\}/g, function(m, m1) {
    return data[m1]
  })
}

// parase image shape
export const parseShape = (img) => {
    var canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    var width = canvas.width

    var o = [(img.width / 2) | 0, (img.height / 2) | 0]
    var d = (window.d = [])

    // paint red on the center pixel (not really visible)
    imageData.data[(o[1] * width + o[0]) * 4] = 254

    for (var theta = 0; theta < 2 * Math.PI; theta += 0.01) {
      var dx = 1 * Math.cos(theta)
      var dy = -1 * Math.sin(theta)
      var i = 0

      var x = o[0]
      var y = o[1]
      var intX = x
      var intY = y
      while (true) { // eslint-disable-line
        x += dx
        y += dy

        intX = x | 0
        intY = y | 0

        if (intY < 0 || intY > canvas.height || intX < 0 || intX > width) {
          break
        }

        var ptr = (intY * width + intX) * 4
        var tone =
          imageData.data[ptr] +
          imageData.data[ptr + 1] +
          imageData.data[ptr + 2]
        var alpha = imageData.data[ptr + 3]

        // draw a green line all the way until the boundary
        imageData.data[ptr] = 0 // R
        imageData.data[ptr + 1] = 254 // G
        imageData.data[ptr + 2] = 0 // B
        imageData.data[ptr + 3] = 254

        // are we there at the boundary?
        if (alpha < 128 || tone > 128 * 3) {
          d.push(i)
          break
        } else {
          i++
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)

    var max = d.reduce(function(prev, curr) {
      return Math.max(prev, curr)
    })

    return `
      var max = ${max}
      var leng = ${JSON.stringify(d)}

      return leng[(theta / (2 * Math.PI)) * leng.length | 0] / max
    `
}
