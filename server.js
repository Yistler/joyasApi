const express = require('express')
const joyas = require('./data/joyas.js')
const app = express()
app.listen(3000, () => console.log('Your app listening on port 3000'))

//ruta raiz
app.get('/', (req, res) => {
  res.send(joyas);
});

//funcion para generar estructura hateoas
const hateoas = ()=>{
  return joyas.results.map((j)=>{
    return{
      categoria: `http://localhost:3000/joyas/categoria/${j.category}`,
      joya: `http://localhost:3000/joyas/${j.id}`,
      campos: `http://localhost:3000/joyas/${j.id}?campos=id,name,model,category,metal,cadena,medida,value,stock`
    }
  })
};

// Almacenar los enlaces HATEOAS para evitar cálculos redundantes
const hateoasLinks = hateoas();

//ordena de forma ascendiente o descendiente por el valor de la prenda
const ordenValores = (order)=>{
  return order == "asc" 
  ? joyas.results.sort((a, b) => a.value - b.value) 
  : order == "desc" 
  ? joyas.results.sort((a, b)=> b.value - a.value) 
  : false;
};
//ruta que devuelve estructura HATEOAS de todas las joyas almacenadas
//o retorna en orden asc o desc el valor de la joya
app.get("/joyas", (req, res)=>{
  const { page } = req.query;
  const { values } = req.query;
  if(values == "asc" || values == "desc"){
    return res.send(ordenValores(values));
  };
  if(page){
    return res.send({ joyas: hateoasLinks.slice(0, page)});
  }
  res.send({
    joyas: hateoasLinks
  })
});
//http://localhost:3000/joyas?page=2
//http://localhost:3000/joyas?values=asc

//retorna un filto devolviendo solo las joyas cuya categoria
const filtrarCategoria = (categoria)=>{
  return joyas.results.filter((c)=> c.category === categoria);
}

//ruta que devuelve solo las joyas correspondientes a la categoria obtenida
app.get("/joyas/categoria/:categoria", (req, res)=>{
  const categoria = req.params.categoria;
  res.send(
    {
    cantidad: filtrarCategoria(categoria).length,
    joyas: filtrarCategoria(categoria)
  });
});

//retorna solo los campos que el usuario especifique
const camposSeleccionados = (id, campos)=>{
  const joya = joyas.results.find((j)=> j.id == id);
  for(propiedad in joya){
    if(!campos.includes(propiedad)){
      delete joya[propiedad];
    }
  }
  return joya;
}
//ruta que permita el filtrado por campos de las joyas
app.get("/joyas/:id", (req, res)=>{
  const { id } = req.params;
  const { campos } = req.query;
  if(campos){res.send( {joya: camposSeleccionados(id, campos.split(","))} )
  }else{
    //si no especifica campos, devuelve toda la joya cuyo id sea dado
    const joya = joyas.results.find((j) => j.id == id);
    if(joya){ 
      res.send( {joya} );
    }else{
      res.status(404).send({
        error: "404 Page not found",
        menssaje: " No existe una joya con ese ID"
      })
    }
  }
})