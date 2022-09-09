const { STRING } = require("sequelize");
const {detail_barang, barang, ruangan} = require("../models");
// const barang = require('../models/barang');

module.exports = {
    
    renderdistribusi : (req, res) => {
        // detail_barang.findAll()
        // .then(getDetail => {
        //     barang.findAll()
        //     .then(getBarang => {
        //         console.log(getDetail, getBarang)
        //         res.status(200).render('tabeldistribusi')
        //     })
        // })
        ruangan.findAll()
        .then(getRuangan => {
            // console.log({getRuangan});
            res.status(200).send('berhasil');
        })
    },

    renderinput : async (req, res) => {
        const id = Number(req.params.id);
        await barang.findAll({where : {id : id}})
        .then(dataBarang => {
            ruangan.findAll({where : {deleted : false}, order : [['nama_ruangan','ASC']]})
            .then(dataRuangan => {
                // console.log(dataBarang, dataRuangan)
                res.status(200).render('inputdistribusi', {dataBarang, dataRuangan});
            })    
        })
        
    },

    renderpilihbarang : async (req, res) => {
        await barang.findAll({where : {deleted : false}})
        .then(getBarang => {
            detail_barang.findAll({where : {deleted : false}})
            .then(getDetail => {
                res.status(200).render('pilihbarang', {getBarang, getDetail});    
            })
        });
    },

    create : (req, res) => {
        var current = new Date();
        var no = 1000;
        const {id_barang, jumlah, baik, kurang_baik, rusak_berat, id_ruangan} = req.body;
        let generateCode = [];  
        for(let k=1; k<=Number(baik); k++){
                no = no + 1;    
                let obj = {
                    id_detailbarang : current.getTime()+no.toString(),
                    id_barang : id_barang,
                    id_ruangan : id_ruangan,
                    kondisi : "Baik",
                    createdby : req.user.nama_petugas,
                    deleted : false
                }
                generateCode.push(obj);
            
        }
        for(let x=1; x<=Number(kurang_baik); x++){ 
                no = no + 1;
                let obj = {
                    id_detailbarang : current.getTime()+no.toString(),
                    id_barang : id_barang,
                    id_ruangan : id_ruangan,
                    kondisi : "Kurang Baik",
                    createdby : req.user.nama_petugas,
                    deleted : false
                }
                generateCode.push(obj);
        }
        for(let y=1; y<=Number(rusak_berat); y++){
                no = no + 1;
                let obj = {
                    id_detailbarang : current.getTime()+no.toString(),
                    id_barang : id_barang,
                    id_ruangan : id_ruangan,
                    kondisi : "Rusak Berat",
                    createdby : req.user.nama_petugas,
                    deleted : false
                }
                generateCode.push(obj);
        }
        
        console.log(generateCode);
        detail_barang.bulkCreate(generateCode)
        .then(result => {
            res.status(200).redirect('/distribusi/pilih');
        })
    }

    // renderpilih : (req, res) => {
    //     detail_barang.findAll()
    //     .then(getDetail => {
    //         data = [];
    //         getDetail.forEach(element => {
    //             data.push(element.id_barang);
    //         })

    //         data.sort();

    //         var current = null; 
    //         var cnt = 0;
    //         for (var i = 0; i < data.length; i++) {
    //             if (data[i] != current) {
    //                 if (cnt > 0) {
    //                     console.log(current + ' :' + cnt);
    //                 }
    //                 current = data[i];
    //                 cnt = 1;
    //             } else {
    //                 cnt++;
    //             }
    //         }
    //         if (cnt > 0) {
    //             console.log(current + ' :' + cnt, typeof(current));
    //             console.log(typeof(cnt));
    //         }
    //         res.status(200).send('berhasil');
       
    //     })
    // }
}