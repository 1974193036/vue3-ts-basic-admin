/* eslint-disable camelcase */

import xlsx from 'xlsx'

// // 1. 创建一个工作簿 workbook
// const wb = xlsx.utils.book_new()
// // 2. 创建工作表 worksheet
// const ws = xlsx.utils.json_to_sheet([
//   { id: 1, name: 'zs', age: 18 },
//   { id: 2, name: 'lisi', age: 19 },
//   { id: 3, name: 'wangwu', age: 20 }
// ])
// // 3. 把工作表放到工作簿中
// xlsx.utils.book_append_sheet(wb, ws)
// // 4. 生成数据保存
// xlsx.writeFile(wb, '测试表格.xlsx', {
//   bookType: 'xlsx'
// })

export const jsonToExcel = (options: {
  data: any[]
  header: Record<string, string>
  fileName: string
  bookType: xlsx.BookType,
  autoWidth: boolean
}) => {
  // 1、创建一个工作簿 workbook
  const wb = xlsx.utils.book_new()

  // 2、创建工作表 worksheet

  if (options.header) {
    options.data = options.data.map(item => {
      const obj: Record<string, any> = {}
      for (const key in item) {
        if (options.header[key]) {
          obj[options.header[key]] = item[key]
        } else {
          obj[key] = item[key]
        }
      }
      return obj
    })
  }

  const ws = xlsx.utils.json_to_sheet(options.data)

  // ws['!cols'] = [{ wch: 10 }, { wch: 300 }]
  // 表格项自适应内容宽度
  if (options.autoWidth) {
    autoWidthFunc(ws, options.data)
  }

  // 3. 把工作表放到工作簿中
  xlsx.utils.book_append_sheet(wb, ws)

  // 4、生成数据保存
  options.fileName = options.fileName || '1.xlsx'
  xlsx.writeFile(wb, options.fileName, {
    bookType: options.bookType || 'xlsx'
  })
}

function autoWidthFunc(sheet: any, data: any[]) {
  const colWidths: any[] = []
  const colNames = Object.keys(data[0]) // 所有列的名称数组

  // 计算每一列的所有单元格宽度
  // 先遍历行
  data.forEach((row) => {
    // 列序号
    let index = 0
    // 遍历列
    for (const key in row) {
      if (colWidths[index] == null) colWidths[index] = []

      switch (typeof row[key]) {
        case 'string':
        case 'number':
        case 'boolean':
          colWidths[index].push(getCellWidth(row[key]))
          break
        case 'object':
        case 'function':
          colWidths[index].push(0)
          break
      }
      index++
    }
  })

  sheet['!cols'] = []
  // 每一列取最大值最为列宽
  colWidths.forEach((widths, index) => {
    // 计算列头的宽度
    widths.push(getCellWidth(colNames[index]))
    // 设置最大值为列宽
    sheet['!cols'].push({ wch: Math.max(...widths) })
  })
}

function getCellWidth(value: any) {
  // 判断是否为null或undefined
  if (value == null || value === '') {
    return 10
  } else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    // 判断是否包含中文
    return value.toString().length * 2.1
  } else {
    return value.toString().length * 1.1
  }
}
