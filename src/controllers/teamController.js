// 模拟队伍数据（内存中存储）
let teams = [
  { id: 1, name: '队伍 1', score: 0 },
  { id: 2, name: '队伍 2', score: 0 },
  { id: 3, name: '队伍 3', score: 0 },
  { id: 4, name: '队伍 4', score: 0 },
  { id: 5, name: '队伍 5', score: 0 },
  { id: 6, name: '队伍 6', score: 0 }
];

// 获取所有队伍
exports.getAllTeams = (req, res) => {
  res.json(teams);
};

// 更新队伍分数
exports.updateTeamScore = (req, res) => {
  const { id, score } = req.body;
  const teamIndex = teams.findIndex(t => t.id === parseInt(id));
  
  if (teamIndex === -1) {
    return res.status(404).json({ message: '队伍不存在' });
  }
  
  teams[teamIndex].score = score;
  res.json(teams[teamIndex]);
};