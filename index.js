const express = require('express');
const app = express();
const PORT = 3010;

app.get('/:cid/:filename', (req, res) => {
  const {cid,filename} = req.params
  res.redirect(`https://${cid}.ipfs.w3s.link/${filename}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});