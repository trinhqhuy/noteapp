const mongoose = require('mongoose')
const middlewareController = require('../controllers/middlewareController')
const Member = require('../models/member')

const memberController = {
    addMember: async(req, res) => {
        try {
            const newMember = await Member({
                _idUser: req.body._idUser,
                _idGroup: req.body._idGroup
            })
            const member = await newMember.save()
            res.status(200).json(member)
        }catch(err) {
            res.status(500).json(err)
        }
    },
    getAllMember: async(req, res) => {
        try {
            const member = await Member.find({_idGroup: req.params.idgroup})
            if(!member) {
                res.status(500).json("Don't have member")
            }
            res.status(200).json(member)
        }catch(err) {
            res.status(500).json(err)
        }
    }
}