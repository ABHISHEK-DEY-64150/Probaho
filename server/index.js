const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const bloodModel = require("./models/Bloodbank");
const userModel = require("./models/user");
const eventModel = require("./models/Event");
const postModel = require("./models/post");

const { json } = require("express");

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let faltuemail;
let faltuemailBloodBank;

mongoose.connect(
  "mongodb+srv://01770121266:01770121266@crud.y04mg.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Register Donor

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
			res.send({ message: 'user already exists' });
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

///Donor Login

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const usermail = await userModel.findOne({ email: email });
		console.log(usermail);

		const isMatch = await bcrypt.compare(password, usermail.password);

		if (isMatch) {
			faltuemail = usermail.email;

			res.send({ message: 'login sucessful', user: usermail });
		} else {
			res.send({ message: 'password does not match' });
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

//Register Blood Bank

app.post('/registerBloodBank', async (req, res) => {
	try {
		const {
			name,
			username,
			email,
			location,
			password,
			phone,
			aPos,
			bPos,
			oPos,
			abPos,
			aNeg,
			bNeg,
			oNeg,
			abNeg,
		} = req.body;

		console.log(req.body);

		const str = username + password;

		bloodModel.findOne({ username: username }, async (err, user) => {
			if (user) {
				res.send({ message: 'The Blood Bank  already exists' });
			} else {
				const user = new bloodModel({
					name,
					username,
					email,
					location,
					password,
					phone,
					aPos,
					bPos,
					oPos,
					abPos,
					aNeg,
					bNeg,
					oNeg,
					abNeg,
				});
				console.log(str);
				const salt = await bcrypt.genSalt(10);

				user.password = await bcrypt.hash(str, salt);
				user.save((err) => {
					if (err) {
						res.send(err);
					} else {
						res.send({
							message: 'sucessfully registered blood bank,plz log in',
						});
					}
				});
			}
		});
	} catch (error) {
		res.send(error);
	}
});

///Blood Bank log in

app.post('/loginBloodBank', async (req, res) => {
	try {
		const { username, password } = req.body;

		const bloodinfo = await bloodModel.findOne({ username: username });
		console.log(bloodinfo);

		console.log('111');

		const str = username + password;

		const isMatch = await bcrypt.compare(str, bloodinfo.password);

		console.log(isMatch);

		console.log('222');

		if (isMatch) {
			faltuemailBloodBank = bloodinfo.username;

			console.log(faltuemailBloodBank);

			res.send({ message: 'login sucessful', user: bloodinfo });
			res.send('login successful');
		} else {
			res.send({ message: 'username and password does not match' });
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

// app.post("/login", async (req, res) => {
// 		const { email, password } = req.body;
//         const usermail = await userModel.findOne({ email: email });

// 		const str = usermail.email;

// 		userModel.findOne({ email: email }, async (err, user) => {

// 		  if (await bcrypt.compare(password, user.password)) {
// 		    res.cookie(`Cookie token name`,`encrypted cookie string Value`);

// 		     console.log(req.cookies);

// 			res.send({ message: "login sucessful", user: user });

// 		  } else {
// 			res.send({ message: "password does not match"});
// 		  }
// 		});
// 	  });

// app.get('/Profile', async (req, res) => {
// 	// let mail = req.cookies.donor;
// 	// console.log(mail);
// 	userModel.find({ $where: { email: "abhishekdey38@gmail.com" } }, (e, result) => {
// 		if (e) res.send('This is Profile');
// 		else res.send(result);
// 	});
// });

//Donor Profile

app.get('/Profile', async (req, res) => {
	console.log(faltuemail);

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

//Blood bank profile

app.get('/BloodBankProfile', async (req, res) => {
	// console.log(faltuemailBloodBank);

	// faltuemailBloodBank = 'sani1@gmail.com';

	bloodModel.find(
		{
			username: faltuemailBloodBank,
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

//logout Donor

app.get('/logout', async function (req, res) {
	const { email, password } = req.body;
	try {
		faltumail = null;
		res.send('You have successfully logged out');
	} catch (error) {
		res.send(error);
	}
});

//User Query

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

//User post

app.post('/post', async (req, res) => {
	const date = new Date();
	const { bloodGroup, bagOfBlood, location, contact } = req.body;
	const post = new postModel({
		bloodGroup,
		bagOfBlood,
		location,
		contact,
		date,
	});
	await post.save();

	userModel.find(
		{
			bloodGroup: bloodGroup,
			location: location,
			// email: "abhishekdey51138@gmail.com",
		},
		(e, result) => {
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'bloodforlifesys@gmail.com',
					pass: 'bloodbank123456789',
				},
			});

			for (let i = 0; i < result.length; i++) {
				var mailOptions = {
					from: 'bloodforlifesys@gmail.com',
					to: result[i].email,
					subject: 'Emergency Blood Needed',
					// text: 'Blood Group: '+bloodGroup+'\nContact: '+contact+'\n\nEmergency blood is needed.If you wish to donate please contact with the above number.\n\n\nRegards\nBlood For Life',
					html: `<div><h2 style='color:red;'>Blood Group: ${bloodGroup}</h2><h2>Contact No.: ${contact}</h2><div style='font-weight:bold;'><p>Emergency blood is needed.If you wish to donate please contact with the above number.</p><p>Regards,</p><p style='line-height: 2px;'>Blood For Life</p></div></div>`,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
			}
		}
	);

	res.send({ message: 'post sucessful', post: post });
});

//Show posts

app.get('/showPost', async (req, res) => {
	// console.log(faltuemail);
	postModel
		.find({}, (e, result) => {
			if (e) res.send(e);
			else res.send(result);
		})
		.sort('-date');
});

//Donor Profile Update

app.put('/Edit', async (req, res) => {
	const newLocation = req.body.location;
	const newPhone = req.body.phone;
	const newLastDonation = req.body.lastDonation;

	const usermail = await userModel.findOne({ email: faltuemail });
	const id = usermail._id;

	try {
		userModel.findById(id, async (err, updatedDonor) => {
			if (newLocation) {
				updatedDonor.location = newLocation;
			}
			if (newPhone) {
				updatedDonor.phone = newPhone;
			}

			if (newLastDonation) {
				updatedDonor.lastDonation = newLastDonation;
			}

			await updatedDonor.save();
			res.send('update');
		});
	} catch (error) {
		console.log(error);
	}
});

app.put('/EditBloodBank', async (req, res) => {
	const newBloodGroup = req.body.bloodGroup;
	const newbagOfBlood = req.body.bagOfBlood;

	console.log(newBloodGroup);
	console.log(newbagOfBlood);
	// faltuemailBloodBank = 'sani1@gmail.com';

	const info = await bloodModel.findOne({ username: faltuemailBloodBank });
	const id = info._id;
	console.log(id);

	try {
		bloodModel.findById(id, async (err, updatedDonor) => {
			if (newBloodGroup === 'A+') {
				updatedDonor.aPos = newbagOfBlood;
			}
			if (newBloodGroup === 'A-') {
				updatedDonor.aNeg = newbagOfBlood;
			}
			if (newBloodGroup === 'B+') {
				updatedDonor.bPos = newbagOfBlood;
			}
			if (newBloodGroup === 'B-') {
				updatedDonor.bNeg = newbagOfBlood;
			}
			if (newBloodGroup === 'O+') {
				updatedDonor.oPos = newbagOfBlood;
			}
			if (newBloodGroup === 'O-') {
				updatedDonor.oNeg = newbagOfBlood;
			}
			if (newBloodGroup === 'AB+') {
				updatedDonor.abPos = newbagOfBlood;
			}
			if (newBloodGroup === 'AB-') {
				updatedDonor.abNeg = newbagOfBlood;
			}

			await updatedDonor.save();
			res.send('update');
		});
	} catch (error) {
		console.log(error);
	}
});

app.post('/createEvent', async (req, res) => {
	// const date = new Date();
	const creator = faltuemailBloodBank;
	const { title, place, date, description } = req.body;
	const event = new eventModel({
		title,
		place,
		date,
		description,
		creator,
	});
	await event.save();

	res.send({ message: 'Event creation sucessful', event: event });
});

app.get('/showEvent', async (req, res) => {
	// const date = new Date();
	eventModel
		.find({ creator: faltuemailBloodBank }, (e, result) => {
			if (e) res.send(e);
			else res.send(result);
		})
		.sort('-date');
});

//queryBloodBank

app.post('/queryBloodBank', async (req, res) => {
	const { bloodGroup, location } = req.body;

	if (bloodGroup === 'A+') {
		console.log('Hello Apos');

		bloodModel.find(
			{
				aPos: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
	if (bloodGroup === 'B+') {
		console.log('Hello Bpos');

		bloodModel.find(
			{
				bPos: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
	if (bloodGroup === 'O+') {
		console.log('Hello Opos');

		bloodModel.find(
			{
				oPos: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
	if (bloodGroup === 'AB+') {
		console.log('Hello ABpos');

		bloodModel.find(
			{
				abPos: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
	if (bloodGroup === 'A-') {
		console.log('Hello Apos');

		bloodModel.find(
			{
				aNeg: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
	if (bloodGroup === 'B-') {
		console.log('Hello Bpos');

		bloodModel.find(
			{
				bNeg: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
	if (bloodGroup === 'O-') {
		console.log('Hello Opos');

		bloodModel.find(
			{
				oNeg: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
	if (bloodGroup === 'AB-') {
		console.log('Hello ABpos');

		bloodModel.find(
			{
				abNeg: { $ne: '0' },
				location: location,
				// email: "abhishekdey51138@gmail.com",
			},
			(e, result) => {
				console.log(result);
				if (e) res.send(e);
				else res.send(result);
			}
		);
	}
});

app.get('/allevents', async (req, res) => {
	const usermail = await userModel.findOne({ email: faltuemail });

	// const date = new Date();
	eventModel
		.find({ place: usermail.location }, (e, result) => {
			if (e) res.send(e);
			else res.send(result);
		})
		.sort('-date');
});


app.post('/sendNotification', async (req, res) => {


  console.log(req.body);

  const { email, phone, description} = req.body; 

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bloodforlifesys@gmail.com',
      pass: 'bloodbank123456789',
    },
  });
  var mailOptions = {
    from: 'bloodforlifesys@gmail.com',
    to: email,
    subject: 'Emergency Blood Needed',
    // text: 'Blood Group: '+bloodGroup+'\nContact: '+contact+'\n\nEmergency blood is needed.If you wish to donate please contact with the above number.\n\n\nRegards\nBlood For Life',
    html: `<div><h2 style='color:red;'>Emergency Blood Needed</h2><h2>Contact No.: ${phone}</h2><div style='font-weight:bold;'><p>${description}</p><p>Regards,</p><p style='line-height: 2px;'>Blood For Life</p></div></div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



});

// app.delete('/delete/:id', (req, res) => {
// 	const id = req.params.id;
// 	bloodModel.findByIdAndRemove(id).exec();
// 	res.send('deleted');
// });

app.listen(3001, (req, res) => {
	console.log('Server running on port 3001');
});
