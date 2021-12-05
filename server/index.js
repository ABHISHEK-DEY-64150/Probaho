const express = require('express');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const bloodModel = require('./models/Donnor');

const userModel = require('./models/user');

var VerifyToken = require('./VerifyToken');

var config = require('./config');

const postModel = require('./models/post');
const { json } = require('express');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const SecretKey = 'thisIsLogInhhhhhhCookie';
let faltuemail;

app.use(express.json());
app.use(cors());

mongoose.connect(
	"mongodb+srv://01770121266:01770121266@crud.y04mg.mongodb.net/food?retryWrites=true&w=majority",
	{
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	}
  );
app.post('/register', async (req, res) => {
	console.log('heyyyyyyyy');

	const {
		name,
		email,
		location,
		password,
		phone,
		gender,
		bloodGroup,
		lastDonation,
	} = req.body;

	console.log(req.body);

	userModel.findOne({ email: email }, async (err, user) => {
		if (user) {
			res.send({ message: 'user already exist' });
		} else {
			const user = new userModel({
				name,
				email,
				location,
				password,
				phone,
				gender,
				bloodGroup,
				lastDonation,
			});
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(user.password, salt);
			user.save((err) => {
				if (err) {
					res.send(err);
				} else {
					res.send({ message: 'sucessfully registered,plz log in' });
				}
			});
		}
	});
});


// app.get('/', async (req, res) => {
// 	// const usermail =  "abhishekdey38@gmail.com";
// 	const usermail = await userModel.findOne({
// 		email: 'abhishekdey38@gmail.com',
// 	});
	
// 	const mail = JSON.stringify(usermail.toString());
// 	res.cookie('heyyyyyy', mail, {
// 		maxAge: 3600_000,
// 		httpOnly: true,
// 	});
// 	console.log(req.cookies);
// 	res.send('Hello world');
// });

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const usermail = await userModel.findOne({ email: email });
		console.log(usermail);

		const isMatch = await bcrypt.compare(password, usermail.password);
		
	
	
		
		if (isMatch) {
		

			faltuemail = usermail.email;

			res.send({ message: 'login sucessful', user: usermail });
			//res.status(200).send({ auth: true, token: token });

			//res.json({ token: token });
		} else {
			res.send({ message: 'password does not match' });
		}

		// const token = jwt.sign(payload, SecretKey, { expiresIn: '1800s' });
	} catch (error) {
		res.status(400).send(error);
	}
});



app.get('/Profile', async (req, res) => {	
	userModel.find(
		{
			email: faltuemail,
		},
		(e, result) => {
			console.log(result);
			if (e) res.send(e);
			else res.send(result);
		}
	);

	// console.log(x);

	// userModel.findById(req.userId, { password: 0 }, function (err, user) {
	// 	if (err)
	// 		return res.status(500).send('There was a problem finding the user.');
	// 	if (!user) return res.status(404).send('No user found.');
	// 	res.status(200).send(user);
	// });
});
// app.get('/Profile', verifyToken, (req, res) => {
// 	res.send({ message: 'password does not match' });
// });

// app.get('/Profile', async (req, res) => {

// 	userModel.find(
// 		{
// 			email: 'abhishekdey51138@gmail.com',
// 		},
// 		(e, result) => {
// 			console.log(result);
// 			if (e) res.send(e);
// 			else res.send(result);
// 		}
// 	);
// });

app.get('/logout', async function (req, res) {
	faltuemail="";
});

app.post('/query', async (req, res) => {
	const now = new Date();
	const temp = new Date(now).setMonth(now.getMonth() - 4);
	const lastDay = new Date(temp);

	const { bloodGroup, location } = req.body;
	console.log(bloodGroup);

	userModel.find(
		{
			lastDonation: { $lt: lastDay },
			bloodGroup: bloodGroup,
			location: location,
			// email: "abhishekdey51138@gmail.com",
		},
		(e, result) => {
			console.log(result);
			if (e) res.send(e);
			else res.send(result);
		}
	);
	
});

app.post('/post', async (req, res) => {
	const { bloodGroup, bagOfBlood, location, contact, date } = req.body;
	const post = new postModel({
		bloodGroup,
		bagOfBlood,
		location,
		contact,
		date,
	});
	await post.save();
	res.send({ message: 'post sucessful', post: post });
});

app.get('/showPost', async (req, res) => {
	// console.log(faltuemail);
	postModel
		.find({}, (e, result) => {
			if (e) res.send(e);
			else res.send(result);
		})
		.sort('date');
});

// app.post('/send', async (req, res) => {
// 	const { name, location } = req.body;
// 	const post = new userModel({ name, location });
// 	await post.save();
// 	console.log('post successful');
// 	res.send({ message: 'post sucessful' });
// });

// app.post('/',(req,res)=>{
//     const DonorName = req.body.DonorName;
//     const Bloodgroup = req.body.BloodGroup;

//     const blood = new bloodModel({ DonorName:DonorName ,BloodGroup: Bloodgroup});

//     try {
//         blood.save();
//         res.send("Data is sent");
//     } catch (error) {
//         console.log(error);
//     }

//     })

// app.get('/read', (req, res) => {
// 	bloodModel.find({}, (err, result) => {
// 		if (err) {
// 			res.send(err);
// 		}
// 		res.send(result);
// 	});
// });

app.put('/Edit', async (req, res) => {
	const newLocation = req.body.location;
	const newPhone = req.body.phone;
	const newLastDonation = req.body.lastDonation;

	const usermail = await userModel.findOne({ email: faltuemail });
	const id = usermail._id;

	try {
		userModel.findById(id, async (err, updatedDonor) => {
			if(newLocation)
			{
                updatedDonor.location = newLocation;
			}
			if(newPhone)
			{
				updatedDonor.phone = newPhone;
			}

			if(newLastDonation)
			{
				updatedDonor.lastDonation = newLastDonation;
			}
			
			
			

			await updatedDonor.save();
			res.send('update');
		});
	} catch (error) {
		console.log(error);
	}
});

// app.delete('/delete/:id', (req, res) => {
// 	const id = req.params.id;
// 	bloodModel.findByIdAndRemove(id).exec();
// 	res.send('deleted');
// });

app.listen(3001, (req, res) => {
	console.log('Server running on port 3001');
});
