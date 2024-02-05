package com.example.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.impl.OrdenDeCompraImp;
import com.example.api.models.OrdenDeCompra;

@RestController
@RequestMapping("/ordendecompra")
@CrossOrigin("http://localhost:4200")
public class OrdenDeCompraController {

	@Autowired
	private OrdenDeCompraImp ordenDeCompraImp;
	
	@PostMapping("/crear")
    public ResponseEntity<OrdenDeCompra> crearOrdenDeCompra(@RequestBody OrdenDeCompra ordenDeCompra) {
		OrdenDeCompra nuevaOrdenDeCompra= ordenDeCompraImp.crearOrdenDeCompra(ordenDeCompra);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOrdenDeCompra);
    }
	@PutMapping("/editar")
    public ResponseEntity<OrdenDeCompra> editarOrdenDeCompra(@RequestBody OrdenDeCompra ordenDeCompra) {
		OrdenDeCompra nuevaOrdenDeCompra= ordenDeCompraImp.editarOrdenDeCompra(ordenDeCompra);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOrdenDeCompra);
    }
	@DeleteMapping("/eliminar/{idOrdenDeCompra}")
    public ResponseEntity<String> eliminarOrdenDeCompra(@PathVariable Long idOrdenDeCompra) {
		 ordenDeCompraImp.eliminarOrdenDeCompra(idOrdenDeCompra);
		return new ResponseEntity<>( HttpStatus.OK);
    }
	@GetMapping("/traer")
	public ResponseEntity<OrdenDeCompra> traerOrdenDeCompra(@RequestBody OrdenDeCompra ordenDeCompra) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ordenDeCompraImp.traerOrdenDeCompra(ordenDeCompra));
    }
	@GetMapping("/listar")
	public ResponseEntity<List<OrdenDeCompra>>listarOrdenDeCompras(){
		return ResponseEntity.ok(ordenDeCompraImp.listarOrdenDeCompras());
	}
}
