const app = require('./app');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});