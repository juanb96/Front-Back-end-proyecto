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

import com.example.api.impl.CarritoDeComprasImpl;
import com.example.api.models.CarritoDeCompras;



@RestController
@RequestMapping("/carritos-compras")
@CrossOrigin("http://localhost:4200")
public class CarritoDeComprasController {

	@Autowired
	private CarritoDeComprasImpl carritoImpl;
	
	@PostMapping("/crear")
	public ResponseEntity<CarritoDeCompras> crearCarritoDeCompras(@RequestBody CarritoDeCompras carritoDeCompras) {
		CarritoDeCompras nuevoCarrito = carritoImpl.crearCarritoDeCompras(carritoDeCompras);
		return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCarrito);
	}
	
	@PutMapping("/editar")
	public ResponseEntity<CarritoDeCompras> editarCarritoDeCompras(@RequestBody CarritoDeCompras carritoDeCompras) {
		CarritoDeCompras carritoActualizado = carritoImpl.editarCarritoDeCompras(carritoDeCompras);
		return ResponseEntity.ok(carritoActualizado);
	}
	
	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<String> eliminarCarritoDeCompras(@PathVariable("id") long id) {
		carritoImpl.eliminarCarritoDeCompras(id);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@GetMapping("/listar")
	public ResponseEntity<List<CarritoDeCompras>> listarCarritoDeCompras() {
		List<CarritoDeCompras> carritos = carritoImpl.listarCarritoDeCompras();
		return ResponseEntity.ok(carritos);
	}
}
