const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// 获取所有队伍
router.get('/', teamController.getAllTeams);

// 更新队伍分数
router.put('/score', teamController.updateTeamScore);

module.exports = router;