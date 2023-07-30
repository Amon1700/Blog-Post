const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const aboutContent = "A blog post is any article, guide, or news piece that is published on a website with the intent to cover a certain topic or answer a specific query. It is usually posted on a blog, which is a website dedicated to publishing these types of content. However, any website can have a dedicated blog section where blog posts are produced. Blog posts are informational in nature and are used to educate readers and satisfy their queries about certain topics. They can also be used to promote products or services, drive traffic, and generate sales and leads for a brand or business.";
const post1 = {
  title : "Artificial intelligence",
  content : "Artificial intelligence (AI) refers to the intelligence exhibited by machines or software, as opposed to the natural intelligence of humans or animals. AI allows computers or robots to perform tasks that typically require human intelligence and discernment. While there are currently no AIs that can match the wide range of tasks performed by humans, some AI systems can excel in specific areas.",
}
const post2 = {
  title : "Blockchain",
  content : "Blockchain is a distributed database or ledger that is shared among a network of computers, also known as nodes. It is best known for its use in cryptocurrency systems, such as Bitcoin, where it maintains a secure and decentralized record of transactions. However, blockchain technology is not limited to cryptocurrency and can be used to make data in any industry immutable, meaning it cannot be altered.",
}
let journals = [post1,post2];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/" , function(req, res) {
  res.render("home",{
    journals:journals,
  });
});

app.get("/about" , function(req, res) {
  res.render("about", {aboutContent:aboutContent});
});

app.get("/compose" , function(req, res) {
  res.render("compose");
});
 
app.get("/post/:postName" ,function(req, res) {
  journals.forEach(function(post) {
    if(_.lowerCase(post.title) === _.lowerCase(req.params.postName))
    {
      res.render("post" , {
        title : post.title,
        content : post.content
      });
    }
  })
});

app.post("/compose" , function(req ,res) {
  const newpost = {
    title : req.body.title,
    content : req.body.content,
  }
  if(newpost.title.length !== 0 && newpost.content.length !==0) 
    journals.push(newpost);

  res.redirect("/");
});

app.get("/delete" , function(req ,res) {
  res.render("delete")

});
app.post("/delete" , function(req ,res) {
  journals = journals.filter(function(post) {
    return _.lowerCase(post.title) !==_.lowerCase(req.body.title)
  })

  res.redirect("/");
});

app.listen(3000, function() { 
  console.log("Server started on port 3000");
});
