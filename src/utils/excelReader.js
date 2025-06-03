const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * 从 Excel 文件中读取题目数据
 * @param {string} filePath - Excel 文件的路径
 * @returns {Array} - 题目数据数组
 */
const readQuestionsFromExcel = (filePath) => {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.error(`文件不存在: ${filePath}`);
      return [];
    }

    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'binary');

    // 解析 Excel 文件
    const workbook = XLSX.read(fileContent, { type: 'binary' });
    const sheetName = workbook.SheetNames[0]; // 获取第一个工作表
    const worksheet = workbook.Sheets[sheetName];

    const questions = [];
    const headers = {};

    // 获取表头
    let col = 0;
    while (true) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      const cell = worksheet[cellAddress];
      if (!cell) break;
      headers[col] = cell.v;
      col++;
    }

    // 获取数据行
    let row = 1;
    while (true) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
      const cell = worksheet[cellAddress];
      if (!cell) break;

      const question = {};
      for (let c = 0; c < col; c++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: c });
        const cell = worksheet[cellAddress];
        if (cell) {
          question[headers[c]] = cell.v;
        }
      }

      questions.push(question);
      row++;
    }

    return questions;
  } catch (error) {
    console.error('读取 Excel 文件时出错:', error);
    return [];
  }
};

module.exports = { readQuestionsFromExcel };