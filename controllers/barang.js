const {barang} = require("../models");

module.exports = {
    
    renderbarang : async (req, res) => {
        await barang.findAll({where : {deleted : false}, order : [['id', 'ASC']]})
        .then(dataBarang => {
            res.status(200).render('databarang', {dataBarang});
        }) 
    },

    renderinputbarang : async (req, res) => {
        res.status(200).render('inputbarang');
    },

    // sini 
    renderupdate : async (req, res) => {
        const id = Number(req.params.id);
        await barang.findOne({where : {id : id}})
        .then(dataBarang => {
            res.status(200).render('updatebarang', {dataBarang});
        })
    },

    renderpreview : async (req, res) =>{
        const id = Number(req.params.id);
        console.log("ini ID nya", id);
        await barang.findOne({where : {id : id}})
        .then(dataBarang => {
            res.status(200).render('previewbarang', {dataBarang})
        })
    },

    create : async (req, res) => {
        var current = new Date();
        var newID = current.getTime().toString();
        const id_barang = newID;
        let harga = req.body.harga;
        var convertHarga = Number(harga.replace(/\D/g, ''));
        console.log('ID :', id_barang, 'Harga :', convertHarga, typeof(convertHarga));
        const found = await barang.findOne({where : {id_barang : id_barang}});
        if(found){
            return res.status(400).json({message : 'Kode Barang telah digunakan'});
        }else{
            await barang.create({
                id_barang : id_barang,
                kode_barang : req.body.kode_barang,
                nama_barang : req.body.nama_barang,
                merk : req.body.merk,
                tipe : req.body.tipe,
                jumlah : req.body.jumlah,
                harga : convertHarga,
                tahun : req.body.tahun,
                sumber_dana : req.body.sumber_dana,
                foto : req.body.foto,
                keterangan : req.body.keterangan,
                deleted : false
            }).then(result => {
                res.status(200).redirect('/barang');
            })
        }
    },

    update : async (req, res) => {
        const id = Number(req.params.id);
        let harga = req.body.harga;
        var convertHarga = Number(harga.replace(/\D/g, ''));
        console.log('ID :', id, 'Harga :', convertHarga);
        const found = await barang.findOne({where : {id : id}});
        if(found){
            await barang.update({
                kode_barang : req.body.kode_barang,
                nama_barang : req.body.nama_barang,
                merk : req.body.merk,
                tipe : req.body.tipe,
                jumlah : req.body.jumlah,
                harga : convertHarga,
                tahun : req.body.tahun,
                sumber_dana : req.body.sumber_dana,
                foto : req.body.foto,
                keterangan : req.body.keterangan
            }, {where : {id : id}})
            .then(result => {
                res.status(200).redirect('/barang')
            })
        }
    },

    deleteByUpdate : async (req, res) => {
        const id = Number(req.params.id);
        const found = await barang.findOne({where : {id :id}});
        if(found){
            await barang.update({
                deleted : true
            }, {where : {id : id}})
            .then(result => {
                res.status(200).redirect('/barang');
            })
        }
    }

}