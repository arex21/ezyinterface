const express = require('express');
const app = express();
const PORT = 3010;
const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("poised-gray-crabCyclicDB")
const database = db.collection("db")
app.get('/:cid', async (req, res) => {
  const {cid} = req.params
  const data = await database.get(cid)
  let __cid =  data["props"]["hash"]
  let __filename = data["props"]["filename"]
  res.redirect(`https://${__cid}.ipfs.w3s.link/${__filename}`);
});
app.get('/',(req,res)=>res.send("OK"))
app.get('/save/:cid/:hash/:filename',async (req,res)=>{
    const {cid,hash,filename} = req.params
    await database.set(cid,{hash,filename})
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