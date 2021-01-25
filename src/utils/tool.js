// convert formatter to result
export const parseFormatter = (template, data) => {
  return template.replace(/\{\{(.+?)\}\}/g, function (m, m1) {
    return data[m1]
  })
}
