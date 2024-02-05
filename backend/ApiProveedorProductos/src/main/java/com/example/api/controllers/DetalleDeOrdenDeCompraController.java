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

import com.example.api.models.DetalleDeOrdenDeCompra;

@RestController
@RequestMapping("/detalledeordendecompra")
@CrossOrigin("http://localhost:4200")
public class DetalleDeOrdenDeCompraController {
	
	@Autowired
	private com.example.api.impl.DetalleDeOrdenDeCompraImp DetalleDeOrdenDeCompraImp;
	
	@PostMapping("/crear")
    public ResponseEntity<DetalleDeOrdenDeCompra> crearDetalleDeOrdenDeCompra(@RequestBody DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) {
		DetalleDeOrdenDeCompra nuevaOrdenDeCompra= DetalleDeOrdenDeCompraImp.crearDetalleDeOrdenDeCompra(detalleDeOrdenDeCompra);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOrdenDeCompra);
    }
	@PutMapping("/editar")
    public ResponseEntity<DetalleDeOrdenDeCompra> editarDetalleDeOrdenDeCompra(@RequestBody DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) {
		DetalleDeOrdenDeCompra nuevaOrdenDeCompra= DetalleDeOrdenDeCompraImp.editarDetalleDeOrdenDeCompra(detalleDeOrdenDeCompra);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOrdenDeCompra);
    }
	@DeleteMapping("/eliminar/{idDetalleDeOrdenDeCompra}")
    public ResponseEntity<String> eliminarDetalleDeOrdenDeCompra(@PathVariable Long idDetalleDeOrdenDeCompra) {
		DetalleDeOrdenDeCompraImp.eliminarDetalleDeOrdenDeCompra(idDetalleDeOrdenDeCompra);
		return new ResponseEntity<>( HttpStatus.OK);
    }
	@GetMapping("/traer")
	public ResponseEntity<DetalleDeOrdenDeCompra> traerDetalleDeOrdenDeCompra(@RequestBody DetalleDeOrdenDeCompra detalleDeOrdenDeCompra) {
        return ResponseEntity.status(HttpStatus.CREATED).body(DetalleDeOrdenDeCompraImp.traerDetalleDeOrdenDeCompra(detalleDeOrdenDeCompra));
    }
	@GetMapping("/listar")
	public ResponseEntity<List<DetalleDeOrdenDeCompra>>listarDetalleDeOrdenDeCompra(){
		return ResponseEntity.ok(DetalleDeOrdenDeCompraImp.listarDetalleDeOrdenDeCompras());
	}

}
