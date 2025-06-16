const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// 获取所有题目
router.get('/', questionController.getAllQuestions);

// 获取必答题
router.get('/required', questionController.getRequiredQuestions);

// 获取抢答题
router.get('/quick', questionController.getQuickQuestions);

// 获取风险题
router.get('/risk', questionController.getRiskQuestions);

// 获取附加赛题目
router.get('/tieBreaker', questionController.getTieBreakerQuestions);

// 标记题目为已使用
router.put('/:id/used', questionController.markQuestionAsUsed);

// 重新加载题目
router.post('/reload', questionController.reloadQuestions);

module.exports = router;