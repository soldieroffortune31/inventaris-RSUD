// const { where } = require("sequelize/types");
const {ruangan} = require("../models/");

module.exports = {

    index : async (req, res) => {
        await ruangan.findAll({where : {deleted : false}, order : [['id','ASC']]})
        .then(dataRuangan => {
            res.status(200).render('tabelruangan', {dataRuangan});;
        })
    },

    inputruangan : async (req, res) => {
      res.status(200).render('inputruangan');  
    },

    renderupdate : async (req, res) =>{
        const id = Number(req.params.id);
        await ruangan.findOne({where : {id : id}})
        .then(dataRuangan => {
            res.status(200).render('updateruangan', {dataRuangan});
        })
    },

    create : async (req, res) => {
        await ruangan.create({
            id_ruangan : req.body.id_ruangan,
            nama_ruangan : req.body.nama_ruangan,
            deleted : false
        }).then(result => {
            res.status(200).redirect('/ruangan')
        })
    },

    updateData : async (req, res) => {
        const id = req.params.id;
        const find = await ruangan.findOne({where : {id : id}})
        // console.log(find.dataValues.id_ruangan)
        if (find){
            await ruangan.update({
                nama_ruangan : req.body.nama_ruangan,
            }, {where : {id : id}})
            .then(result => {
              res.status(200).redirect('/ruangan')  
            })
        }
    },

    deleteByUpdate : async (req, res) => {
        const id = req.params.id;
        const find = await ruangan.findOne({where : {id_ruangan: id}});
        if(find){
            await ruangan.update({
                deleted : true
            }, {where : {id_ruangan : id}})
            .then(result => {
                res.status(200).json({code : 200, message : "Berhasil hapus data"})
            })
        }
    },

    delete : async (req, res) => {
        const id = req.params.id;
        const find = await ruangan.findOne({where : {id_ruangan : id}});
        if(find){
            await ruangan.destroy({where : {id_ruangan : id}})
            .then(result => {
                res.status(200).json({code : 200, message : "Berhasil hapus"});
            })
        }
    }
}