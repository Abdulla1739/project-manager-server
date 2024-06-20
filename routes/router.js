const express = require ("express")
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectsController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddelware = require('../middlewares/multerMiddleware')


const router = new express.Router()


// for regitsering 
router.post('/register',userController.registerController)


// for login

router.post('/login',userController.loginController)


// for add projects

router.post('/project/add',jwtMiddleware,multerMiddelware.single('projectImg'),projectController.addProjectController)

//for geetting home projects
router.get('/home-projects',projectController.getHomeProjectsController)

// for gett all projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)


router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

router.put('/project/:pid/edit', jwtMiddleware, multerMiddelware.single('projectImg'), projectController.editProjectController)

router.delete('/project/:pid/remove',jwtMiddleware,projectController.removeProjectController)

router.put('/user/edit', jwtMiddleware, multerMiddelware.single('profilePic'), userController.editProfileController);

module.exports = router