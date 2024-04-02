import User from "../model/User.js";
import * as faceapi from "face-api.js";
const convertDescriptorToArray = (desc) => {
  const parsedDescriptor = JSON.parse(desc);
  console.log(parsedDescriptor);
  const requiredDescriptor = Object.keys(parsedDescriptor).map(
    (key) => parsedDescriptor[key]
  );
  return requiredDescriptor;
};
export const signup = async (req, res, next) => {
  const { name, email, descriptor } = req.body;
  let existingUser;
  console.log(name + " " + email + " " + descriptor);
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err.message);
  }
  console.log(existingUser);
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }
  // const parsedDescriptor = JSON.parse(descriptor);
  // console.log(parsedDescriptor);
  const requiredDescriptor = convertDescriptorToArray(descriptor);
  const user = new User({
    name,
    email,
    descriptor: requiredDescriptor,
  });
  console.log(user);
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, descriptor } = req.body;
  console.log(descriptor);
  let userPresent;
  try {
    userPresent = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!userPresent) {
    return res
      .status(404)
      .json({ message: "the user doesn't exist. Please sign up first." });
  }
  // const isPasswordCorrect = bcrypt.compareSync(password, userPresent.password);
  // const maxDescriptorDistance = 0.6;
  // const faceMatcher = new faceapi.FaceMatcher(
  //   descriptor,
  //   maxDescriptorDistance
  // );
  const dbDescriptor = userPresent.descriptor;
  const requiredDescriptor = convertDescriptorToArray(descriptor);
  // const checkFace = faceMatcher.findBestMatch(dbDescriptor);
  const findEuclideanDist = faceapi.euclideanDistance(
    requiredDescriptor,
    dbDescriptor
  );
  if (findEuclideanDist > 0.6) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res.status(200).json({ message: "Login Successfull" });
};
