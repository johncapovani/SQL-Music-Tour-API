// DEPENDENCIES 
const stages = require('express').Router()
const db = require('../models')
const { Stage, Event, StageEvent } = db
const { Op } = require('sequelize')

// FIND ALL stages
stages.get('/', async (req, res) => {
    try {
        const foundstages = await Stage.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundstages)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC Stage
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { name: req.params.name },
            include: {
                model: Event,
                as: "events",
                through: StageEvent
            }
        })
        res.status(200).json(foundStage)
    } catch (err) {
        res.status(500).json(err)
    }
})

// CREATE A Stage
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new Stage',
            data: newStage
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A Stage
stages.put('/:name', async (req, res) => {
    try {
        const updatedstages = await Stage.update(req.body, {
            where: {
                Stage_id: req.params.name
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedstages} Stage(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A Stage
stages.delete('/:name', async (req, res) => {
    try {
        const deletedstages = await Stage.destroy({
            where: {
                Stage_id: req.params.name
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedstages} Stage(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = stages