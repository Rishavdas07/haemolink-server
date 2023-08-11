const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9711;
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine","ejs");
async function main(){
    await mongoose.connect(
        'mongodb+srv://siddhartha:haemolinkadmin@cluster0.x3n4iop.mongodb.net/?retryWrites=true&w=majority'
        );
    console.log("Connected to MongoDB Database");
}
main();
const blogSchema = new mongoose.Schema({
    heading: String,
    description: String,
    image: String
});
const blog = mongoose.model("blog", blogSchema, "blog-posts");
const campaignSchema = new mongoose.Schema({
    heading: String,
    description: String,
    image: String
});
const campaign = mongoose.model("campaign", campaignSchema, "campaign-posts");
app.get("/",function(req,res){
    res.send('Rishav er Nunu');
});
app.get("/blogPost",function(req,res){
    res.render('blogPost');
});
app.get("/blogs",async(req,res)=>{
    try{
        const blogData = await blog.find();
        console.log(blogData);
        res.json(blogData);
    }catch(error){
        console.error("Error Retreiving Blog Post:",error);
        res.status(500).send("Error Retriving Blog Post");
    }
})
app.post("/post_blog",function(req,res){
    console.log("Posting");
    const heading = req.body.heading;
    const description = req.body.content;
    const image = req.body.image;
    const password = req.body.password;
    if(password ==='rishav'){
        const newBlogPost = new blog({
            heading: heading,
            description: description,
            image: image
        })
        async function saveBlogPost(){
            await newBlogPost.save();
        }
        saveBlogPost();
        console.log(newBlogPost);
    }
    else{
        res.send("Invalid Password / Contact Server Admin");
    }
});
app.post("/post_campaign",function(req,res){
    console.log("Posting");
    const heading = req.body.heading;
    const description = req.body.content;
    const image = req.body.image;
    const newCampaignPost = new campaign({
        heading: heading,
        description: description,
        image: image
    });
    async function saveCampaignPost(){
        await newCampaignPost.save();
    }
    saveCampaignPost();
    console.log(newCampaignPost);
});
app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
});