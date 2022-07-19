const db = require('../../services/database');
const fs = require('fs-extra')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Exercice = db.Exercice;
const User = db.User;

const getAll = async (req, res) => {
    const lang = req.query.lang || 'fr';
    const exercice = await Exercice.find();
    let response = {
        sits_down: [],
        stand_up: [],
        on_the_ground: [],
        all: [],
    }
    let myJWT
    if (req.headers.authorization) {
        try {
            myJWT = jwt.verify(req.headers.authorization.split(' ')[1], process.env.APP_JWT)
        } catch (err) {
            return res.status(403).json({
                status: 403,
                errorType: 'NotPremium',
                message: 'You need to be premium to access this exercice'
            })
        }
    }
    for (let i in exercice) {
        let favorite = {}
        if (req.headers.authorization) {
            const user = await User.findOne({ email: myJWT.identity });
            favorite.favorite = user.favorites.includes(mongoose.Types.ObjectId(exercice[i]._id))
        }
        response.all.push({
            id: exercice[i]._id,
            name: exercice[i].name[lang],
            title: exercice[i].title[lang],
            thumbnail: exercice[i].thumbnail,
            thumbnail_demo: exercice[i].thumbnail_demo,
            description: exercice[i].description[lang],
            type: exercice[i].type,
            premium: exercice[i].premium,
            ...favorite
        })
        if (exercice[i].type.includes('sits_down')) {
            response.sits_down.push({
                id: exercice[i]._id,
                name: exercice[i].name[lang],
                title: exercice[i].title[lang],
                thumbnail: exercice[i].thumbnail,
                thumbnail_demo: exercice[i].thumbnail_demo,
                description: exercice[i].description[lang],
                type: exercice[i].type,
                premium: exercice[i].premium,
                ...favorite
            })
        }
        if (exercice[i].type.includes('stand_up')) {
            response.stand_up.push({
                id: exercice[i]._id,
                name: exercice[i].name[lang],
                title: exercice[i].title[lang],
                thumbnail: exercice[i].thumbnail,
                thumbnail_demo: exercice[i].thumbnail_demo,
                description: exercice[i].description[lang],
                type: exercice[i].type,
                premium: exercice[i].premium,
                ...favorite
            })
        }
        if (exercice[i].type.includes('on_the_ground')) {
            response.on_the_ground.push({
                id: exercice[i]._id,
                name: exercice[i].name[lang],
                title: exercice[i].title[lang],
                thumbnail: exercice[i].thumbnail,
                thumbnail_demo: exercice[i].thumbnail_demo,
                description: exercice[i].description[lang],
                type: exercice[i].type,
                premium: exercice[i].premium,
                ...favorite
            })
        }
    }

    res.status(200).json({
        status: 200,
        data: response
    })
}

const getOne = async (req, res) => {
    const lang = req.query.lang || 'fr';
    const exercice = await Exercice.findById(req.params.id);
    if (!exercice) {
        return res.status(404).json({
            status: 404,
            errorType: 'ExerciceNotFound',
            data: 'Exercice not found'
        })
    }
    let myJWT
    if (req.headers.authorization) {
        try {
            myJWT = jwt.verify(req.headers.authorization.split(' ')[1], process.env.APP_JWT)
        } catch (err) {
            return res.status(403).json({
                status: 403,
                errorType: 'NotPremium',
                message: 'You need to be premium to access this exercice'
            })
        }
    }
    if (exercice.premium){
        if (!myJWT) {
            return res.status(403).json({
                status: 403,
                errorType: 'NotPremium',
                message: 'You need to be premium to access this exercice'
            })
        }
        const user = await User.findOne({ email: myJWT.identity });
        if (!user || !user.premium) {
            return res.status(403).json({
                status: 403,
                errorType: 'NotPremium',
                message: 'You need to be premium to access this exercice'
            })
        }
    }
    const response = {
        id: exercice._id,
        name: exercice.name[lang],
        title: exercice.title[lang],
        thumbnail: exercice.thumbnail,
        thumbnail_demo: exercice.thumbnail_demo,
        description: exercice.description[lang],
        type: exercice.type,
        premium: exercice.premium,
        video: exercice.video,
        video_demo: exercice.video_demo,
        audio: exercice.audio[lang],
    }
    if (req.headers.authorization) {
        const user = await User.findOne({ email: myJWT.identity });
        response.favorite = user.favorites.includes(mongoose.Types.ObjectId(exercice._id))
    }
    res.status(200).json({
        status: 200,
        data: response
    })
}

const create = async (req, res) => {
    if (!fs.existsSync("./files/video")) {
        fs.mkdirSync("./files/video", { recursive: true });
    }
    if (!fs.existsSync("./files/audio")) {
        fs.mkdirSync("./files/audio", { recursive: true });
    }
    if (!fs.existsSync("./files/image")) {
        fs.mkdirSync("./files/image", { recursive: true });
    }
    const exercice = new Exercice();
    exercice.name = JSON.parse(req.body.name)
    exercice.title = JSON.parse(req.body.title)
    exercice.description = JSON.parse(req.body.description)
    exercice.premium = JSON.parse(req.body.premium)
    exercice.type = req.body.type
    let myExercice = await exercice.save();
    exercice.thumbnail = `/thumbnail/${myExercice._id.toString()}`
    exercice.thumbnail_demo = `/thumbnail/${myExercice._id.toString()}_demo`
    exercice.video = `/video/${myExercice._id.toString()}`
    exercice.video_demo = `/video-demo/${myExercice._id.toString()}`,
    exercice.audio = {
        fr: `/audio/${myExercice._id.toString()}?lang=fr`,
        en: `/audio/${myExercice._id.toString()}?lang=en`,
    }
    myExercice = await exercice.save();
    try {
        await fs.copyFile(req.body.video.path, `./files/video/video_${myExercice._id.toString()}.mp4`);
        await fs.copyFile(req.body.video_demo.path, `./files/video/video_demo_${myExercice._id.toString()}.mp4`);
        await fs.copyFile(req.body.audio_fr.path, `./files/audio/audio_fr_${myExercice._id.toString()}.mp3`);
        await fs.copyFile(req.body.audio_en.path, `./files/audio/audio_en_${myExercice._id.toString()}.mp3`);
        await fs.copyFile(req.body.thumbnail.path, `./files/image/thumbnail_${myExercice._id.toString()}.png`);
        await fs.copyFile(req.body.thumbnail_demo.path, `./files/image/thumbnail_${myExercice._id.toString()}_demo.png`);
        await exercice.save();
    } catch (err) {
        await Exercice.deleteOne({ _id: exercice._id });
        console.log(err);
        return res.status(500).json({
            status: 500,
            errorType: 'FileError',
            data: err
        })
    }
    res.status(200).json({
        status: 200,
        data: myExercice
    })
}

module.exports = {
    getAll,
    create,
    getOne
}