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

import com.example.api.impl.VentaImp;
import com.example.api.models.Venta;

@RestController
@RequestMapping("/ventas")
@CrossOrigin("http://localhost:4200")
public class VentaController {
	
	@Autowired
	private VentaImp ventaImp;
	
	@PostMapping("/crear")
    public ResponseEntity<Venta> crearVenta(@RequestBody Venta venta) {
        Venta nuevaVenta = ventaImp.crearVenta(venta);
        return new ResponseEntity<>(nuevaVenta, HttpStatus.CREATED);
    }
	@PutMapping("/editar")
    public ResponseEntity<Venta> editarVenta(@RequestBody Venta venta) {
        Venta ventaActualizada = ventaImp.editarVenta(venta);
        return ResponseEntity.ok(ventaActualizada);
    }

    @DeleteMapping("/eliminar/{idVenta}")
    public ResponseEntity<String> eliminarVenta(@PathVariable Long idVenta) {
         ventaImp.eliminarVenta(idVenta);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/traer")
    public ResponseEntity<Venta> traerVenta(@RequestBody Venta venta) {
        Venta ventaEncontrada = ventaImp.traerVenta(venta);
        return ResponseEntity.ok(ventaEncontrada);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Venta>> listarVentas() {
        List<Venta> listaVentas = ventaImp.listarVentas();
        return ResponseEntity.ok(listaVentas);
    }

}
