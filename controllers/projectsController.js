const { Query } = require("mongoose");
const projects = require("../models/projectModel");

exports.addProjectController = async (req, res) => {
  console.log("Inside project function");
  const { title, languages, overview, github, website } = req.body;
  const userId = req.payload;
  const projectImg = req.file.filename;
  console.log(title, languages, overview, github, website, projectImg, userId);

  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res
        .status(406)
        .json("Already mentioned project added in the portal... Add new!!!");
    } else {
      const newProject = new projects({
        title,
        languages,
        overview,
        github,
        website,
        projectImg,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// res.status(200).send(`<h1>Project Manager started and awaited </h1>`)
exports.getHomeProjectsController = async (req, res) => {
  console.log("Inside getHomeProjects");
  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};


exports.getAllProjectsController = async (req, res) => {
  console.log("Inside getAllProjects");
  const searchKey = req.query.search;
  const query = {languages: {$regex: searchKey, $options: "i" }};
  try {
    const allProjects = await projects.find(query);
    console.log(allProjects);
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getUserProjectsController = async (req, res) => {
  console.log("Inside getuserProjects");
  const userId = req.payload;
  try {
    const userProjects = await projects.find({ userId });
    res.status(200).json(userProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.editProjectController = async (req, res) => {
  console.log("Inside editProjectController");
  const { pid } = req.params;
  const { title, languages, overview, github, website, projectImg } = req.body;
  const uploadImg = req.file ? req.file.filename : projectImg;
  const userId = req.payload;
  console.log(pid,title, languages, overview, github, website,uploadImg,userId);
  try {
    const updatedProject = await projects.findByIdAndUpdate({_id: pid},{ title, languages, overview, github, website, projectImg: uploadImg, userId},{new:true}
    );
    console.log(updatedProject);
    await updatedProject.save()
    res.status(200).json(updatedProject)
  } catch (err) {
    res.status(401).json(err);
  }
};

// remove projects
exports.removeProjectController = async (req,res) => {
  console.log("Inside removeProjectController");
  const {pid} = req.params
  try {
      const removedProject = await projects.findByIdAndDelete({_id:pid})
      res.status(200).json(removedProject)
  } catch (error) {
      res.status(401).json(error)
  }
}