const { readQuestionsFromExcel } = require('../utils/excelReader');
const path = require('path');

// 读取Excel文件
const loadQuestions = () => {
  return readQuestionsFromExcel(path.join(__dirname, '../../data/questions.xlsx'));
};

// 题目数据（内存中缓存）
let questions = [];
let usedQuestions = [];

// 加载题目
const loadInitialData = () => {
  questions = loadQuestions();
  usedQuestions = [];
};

// 初始化数据
loadInitialData();

// 获取所有题目
exports.getAllQuestions = (req, res) => {
  res.json(questions.filter(q => !usedQuestions.includes(q.id)));
};

// 获取必答题
exports.getRequiredQuestions = (req, res) => {
  const requiredQuestions = questions
    .filter(q => q.type === 'required' && !usedQuestions.includes(q.id));
  res.json(requiredQuestions);
};

// 获取抢答题
exports.getQuickQuestions = (req, res) => {
  const quickQuestions = questions
    .filter(q => q.type === 'quick' && !usedQuestions.includes(q.id));
  res.json(quickQuestions);
};

// 获取风险题
exports.getRiskQuestions = (req, res) => {
  const difficulty = req.query.difficulty;
  let riskQuestions = questions
    .filter(q => q.type === 'risk' && !usedQuestions.includes(q.id));
  
  if (difficulty) {
    riskQuestions = riskQuestions.filter(q => q.difficulty === parseInt(difficulty));
  }
  
  res.json(riskQuestions);
};

// 标记题目为已使用
exports.markQuestionAsUsed = (req, res) => {
  const { id } = req.params;
  usedQuestions.push(id);
  res.json({ message: '题目已标记为已使用' });
};

// 重新加载题目
exports.reloadQuestions = (req, res) => {
  loadInitialData();
  res.json({ message: '题目已重新加载' });
};