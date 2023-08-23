const express = require('express');
const app = express();
const PORT = 3010;
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
app.get('/:cid/:filename', (req, res) => {
  const {cid,filename} = req.params
  res.redirect(`https://${cid}.ipfs.w3s.link/${filename}`);
});
app.get('/',(req,res)=>res.send("OK"))
app.get('/save/:cid/:hash',async (req,res)=>{
    const {cid,hash} = req.params
    await s3.putObject({
        Body: JSON.stringify({key:hash}),
        Bucket: "cyclic-poised-gray-crab-ap-south-1",
        Key:   `some_files/${cid}.json`,
    }).promise()
    res.send("done")
})
app.get('/get/:cid/a/a',async(req,res)=>{
    const {cid} = req.params
    let my_file = await s3.getObject({
        Bucket: "cyclic-poised-gray-crab-ap-south-1",
        Key: `some_files/${cid}.json`,
    }).promise()
    res.send(my_file)
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});