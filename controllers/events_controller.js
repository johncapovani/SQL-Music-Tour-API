// DEPENDENCIES 
const events = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

// FIND ALL events
events.get('/', async (req, res) => {
    try {
        const foundevents = await Event.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundevents)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC Event
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { Event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A Event
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new Event',
            data: newEvent
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A Event
events.put('/:id', async (req, res) => {
    try {
        const updatedevents = await Event.update(req.body, {
            where: {
                Event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedevents} Event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A Event
events.delete('/:id', async (req, res) => {
    try {
        const deletedevents = await Event.destroy({
            where: {
                Event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedevents} Event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = events