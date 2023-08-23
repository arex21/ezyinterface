const express = require('express');
const app = express();
const PORT = 3010;
const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("poised-gray-crabCyclicDB")
const database = db.collection("db")
app.get('/:cid/:filename', (req, res) => {
  const {cid,filename} = req.params
  res.redirect(`https://${cid}.ipfs.w3s.link/${filename}`);
});
app.get('/',(req,res)=>res.send("OK"))
app.get('/save/:cid/:hash',async (req,res)=>{
    const {cid,hash} = req.params
    await database.set(cid,{hash})
    res.send("done")
})
app.get('/get/:cid/a/a',async(req,res)=>{
    const {cid} = req.params
    const data = await database.get(cid)
    res.send(data["props"]["hash"])
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});