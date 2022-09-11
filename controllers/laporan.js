const {detail_barang, barang, ruangan} = require('../models');

module.exports = {

    renderlaporan : (req, res) =>{
        ruangan.findAll({where : {deleted : false}, order :[['nama_ruangan','ASC']]})
        .then(dataRuangan => {
            detail_barang.findAll({include: [{model: barang, as: "barang"}]})
            .then(getDetail => {
                res.status(200).render('inventaris', {dataRuangan, getDetail});
            })
        })
    },

    getDetail : (req, res) => {
        const {id_ruangan} = req.body;
        // console.log(id_ruangan)
        // barang.findAll({where : {deleted : false}})
        // .then(getBarang => {
            detail_barang.findAll({include: [{model: barang, as: "barang"}, {model: ruangan, as: "ruangan"}], where: {id_ruangan : id_ruangan}})
            .then(getDetail => {
                console.log(getDetail)
                ruangan.findAll({where : {deleted : false}, order :[['nama_ruangan','ASC']]})
                .then(getRuangan => {
                    const data = [];
                    getDetail.forEach(element => {
                        data.push(element.id_barang)
                    });
                    let uniqueChars = [...new Set(data)];
                    // console.log(getDetail.find(element => element.barang.kode_barang ))
                    let getData  = []
                    let no = 0;
                    for(let i=0; i<uniqueChars.length; i++){
                        let obj = {
                            id_barang : uniqueChars[i],
                            jumlah : getDetail.filter(element => element.id_barang === uniqueChars[i]).length,
                            baik : 0,
                            kurang_baik : 0,
                            rusak_berat : 0
                        }
                        getData.push(obj)
                    }
    
                    // let jumlah = 1;
                    for(let j=0; j<getDetail.length; j++){
                        for(let k=0; k<getData.length; k++){
                            if(getDetail[j].id_barang === getData[k].id_barang){
                                getData[k].kode_barang = getDetail[j].barang.kode_barang;
                                getData[k].nama_barang = getDetail[j].barang.nama_barang;
                                getData[k].merk = getDetail[j].barang.merk;
                                getData[k].tipe = getDetail[j].barang.tipe;
                                getData[k].harga = getDetail[j].barang.harga;
                                getData[k].keterangan = getDetail[j].barang.keterangan;
                                getData[k].nama_ruangan = getDetail[j].ruangan.nama_ruangan;
                                if(getDetail[j].kondisi === "Baik"){
                                    getData[k].baik = getData[k].baik + 1;
                                }else if(getDetail[j].kondisi === "Kurang Baik"){
                                    getData[k].kurang_baik = getData[k].kurang_baik + 1;
                                }else{
                                    getData[k].rusak_berat = getData[k].rusak_berat + 1;
                                }
                            }
                        }
                    }
                    // res.status(200).send(getData)
                    res.status(200).render('inventarisruangan', {getData, getRuangan});
                })
                // console.log(getData)
                // res.send(getData)
            })

        // })
    }

}