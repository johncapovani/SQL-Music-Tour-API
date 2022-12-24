// DEPENDENCIES 
const events = require('express').Router()
const db = require('../models')
const { Event, MeetGreet, Stage, Band, SetTime } = db


// FIND ALL events
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll()
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC Event
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { city: req.params.name },
            include: [
                {
                    model: MeetGreet,
                    as: "meet_greets",
                    include: {
                        model: Band,
                        as: "band"
                    }
                },
                {
                    model: Stage,
                    as: "stages",
                    include: {
                        model: SetTime,
                        as: "set_times"
                    }
                }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A Event
events.put('/:name', async (req, res) => {
    try {
        const updatedevents = await Event.update(req.body, {
            where: {
                Event_id: req.params.name
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
events.delete('/:name', async (req, res) => {
    try {
        const deletedevents = await Event.destroy({
            where: {
                Event_id: req.params.name
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