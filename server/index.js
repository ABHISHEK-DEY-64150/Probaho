const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb+srv://01770121266:01770121266@crud.y04mg.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => {
  console.log("running on port 3001");
});

app.post("/register", async (req, res) => {
  const { name, email, location, password,lastDonation} = req.body;

  // console.log(password);
  // const salt =  bcrypt.genSalt(6);


  userModel.findOne({ email: email },  async (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new userModel({ name, email, location, password,lastDonation });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfully registered,plz log in" });
        }
      });
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  

  userModel.findOne({ email: email }, async (err, user) => {
    // usedddddr.password === password

    if (await bcrypt.compare(password, user.password)) {
      // console.log(user);
      res.send({ message: "login sucessful", user: user });
    } else {
      res.send({ message: "password does not match"});
    }
  });
});

app.post("/post", async (req,res)=>{

  const { bloodGroup, bagOfBlood, location, contact,date } = req.body;
  const post = new postModel({ bloodGroup, bagOfBlood, location, contact,date });
  await post.save();
  res.send({ message: "post sucessful", post: post });
});


app.get("/showPost", async (req, res) => {
    postModel.find({},(e,result) => {
        if(e) res.send(e);
        else res.send(result);
    }).sort('-date').limit(2);
});


app.post("/query", async (req, res) => {

  const now = new Date();
  const temp = new Date(now).setMonth(now.getMonth() - 2);
  const lastDay = new Date(temp);

  const { name,location} = req.body;
  console.log(name);

  userModel.find({"lastDonation":{$gte: lastDay, $lt: new Date()},name:name,location:location},(e,result) => {

    console.log(result);
      if(e) res.send(e);
      else res.send(result);
  })
});




app.get("/", async (req, res) => {
  res.send("Api");
});

// app.post("/insert", async (req, res) => {
//   const foodName = req.body.foodName;
//   const days = req.body.days;
//   const food = new FoodModel({ foodName: foodName, days: days });
//   try {
//     await food.save();
//     res.send("inserting");
//   } catch (e) {
//     console.log (e);
//   }    
// });

// app.get("/read", async (req, res) => {

//     FoodModel.find({},(e,result) => {
//         if(e) res.send(e);
//         else res.send(result)
//     })
// });

// app.delete("/delete/:id", async (req, res) => {

//   const id = req.params.id;
//   await FoodModel.findByIdAndDelete(id).exec();
//   res.send(id);

// });

// app.put("/update", async (req, res) => {
//   const newFoodName = req.body.newFoodName;
//   const id = req.body.id;
//   try {
//     await FoodModel.findById(id, (e,result) => {
//       result.foodName = newFoodName;
//       result.save();
//       res.send("update");
//   });

//   } catch (e) {
//     console.log(e);
//   }
// });
