const express = require('express');

const {MongoClient} = require ('mongodb')

const router = express.Router();

const Base = process.env.DDBB307;
const nombrebase = "DataBaseEPS"


router.get('/endpoint1', async (req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase);
        const collecion = db.collection("usuario");
        const result = await collecion.find().sort({nombre:1}).toArray()
        res.json(result)        
    } catch (error) {            
        res.status(404);
        res.send({error: "no se pudo hacer la consulta"});   
    }

    
});
router.get('/endpoint2', async (req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase);
        const collecion = db.collection("cita");
        const result = await collecion.find({fecha:"5-03-23"},{$sort: {datosUsuario:1}}).toArray()
        res.json(result)   
        client.close();        
    } catch (error) {            
        res.status(404);
        res.send({error: "no se pudo hacer la consulta"});   
    }

    
});

router.get('/endpoint3', async(req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase)
        const collection = db.collection("medico");
        const result = await collection.find({ especialidad: "Dermatologia" }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        
        res.status(404);
        res.send({error: "no se pudo hacer la consulta"});
    }
});

router.get('/endpoint4', async(req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase)
        const collection = db.collection("cita");
        const result = await collection.findOne({_id:req.params.id});
        res.json(result);
        client.close();
    } catch (error) {
        
        res.status(404);
        res.send({error: "no se pudo hacer la consulta"});
    }
});

router.get('/endpoint5', async (req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase);
        const collecion = db.collection("medico");
        const result = await collecion.find({nmroMatriculaProfesional:223311}).toArray()
        res.json(result)
        const collecion2 = db.collection("cita");
        const resultt = await collecion2.find()
        res.json(resultt)
        client.close();        
    } catch (error) {            
        res.status(404);
        res.send({error: "no se pudo hacer la consulta"});   
    }

    
});

router.get('/endpoint6', async (req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase);
        const collecion = db.collection("cita");
        const result = await collecion.find({fecha:"3-02-23"}).toArray()
        res.json(result)
        client.close();        
    } catch (error) {            
        res.status(404);
        res.send({error: "no se pudo hacer la consulta"});   
    }

    
});
router.get('/endpoint7', async (req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase);
        const collecion = db.collection("medico");
        const result = await collecion.find().toArray()
        res.json(result)     
        client.close();      
    } catch (error) {            
        res.status(404);
        res.send({error: "no se pudo hacer la consulta"});   
    }

    
});

router.get('/endpoint8', async (req, res) => {
    try {
        const client = new MongoClient(Base)
        await client.connect();
        const db = client.db(nombrebase)
        const collecion = db.collection("cita")
        const result = await collecion.find({$and: [{medico: "Josue Escalante"}, {fecha: "5-03-23"}]}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


router.post('/endpoint11', async (req,res)=>{
    try {
        const client = new MongoClient(Base);
        await client.connect();
        const db = client.db(nombrebase);
        const collecion = db.collection("usuario");
        const user = await collecion.create({
            nombre: req.body.nombre,
            segdo_nombre: req.body.segdo_nombre,
            primer_apellido: req.body.primer_apellido,
            segdo_apellido: req.body.segdo_apellido,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            email: req.body.email,
            tipo_documento: req.body.tipo_documento,
            genero: req.body.genero,
            acudiente: req.body.acudiente
        })
        if(req.body.tipo_documento === {tipo_documento:"TI"}){
            res.json("Pidele a tu acudiente que consulte si estas registrado")
        }
     
        const result = await user.save();
        res.json(result)
        console.log(req.body);
        client.close();   
    } catch (error) {            
        res.status(404);
        res.send({error: "no se pudo hacer la consultax"});   
    }

    
});
router.get('endpoint12', async(req,res)=>{
    const client = new MongoClient(Base)
    await client.connect();
    const db = client.db(nombrebase);
    const collection = db.collection("cita")
    const find = db.collection.aggregate([
        {
          $match: {
            nombre: "Rechazada",
            fecha: {
              $gte: ISODate("5-03-23"),
              $lt: ISODate("5-03-23")
            }
          }
        },
        {
          $project: {
            _id: 0,
            fecha: 1,
            datosUsuario: "",
          }
        }
      ])
      res.json(find)
      
})


module.exports = router;