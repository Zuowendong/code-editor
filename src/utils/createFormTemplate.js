import ejs from 'ejs'
import getFileData from './getFileData'

export default async (config) => {
  const formTemplate = await getFileData('/static/form.ejs')
  const code = ejs.render(formTemplate.toString(), {
    config
  })

  let res = code.replace(/\r\n/g, '')
  res = res.replace(/\n/g, '')
  res = res.replace(/\s/g, ' ')
  return res
}
