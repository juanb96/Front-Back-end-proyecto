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

import com.example.api.impl.DetallesDeOrdenDeVentaImp;
import com.example.api.models.DetallesDeOrdenDeVenta;

@RestController
@RequestMapping("/detallesDeOrdenDeVenta")
@CrossOrigin("http://localhost:4200")
public class DetallesDeOrdenDeVentaController {
	
	
	@Autowired
	private DetallesDeOrdenDeVentaImp detallesDeOrdenDeVentaImp;
	
	@PostMapping("/crear")
    public ResponseEntity<DetallesDeOrdenDeVenta> crearDetallesDeOrdenDeVenta(@RequestBody DetallesDeOrdenDeVenta detallesDeOrdenDeVenta) {
        DetallesDeOrdenDeVenta nuevoDetallesDeOrdenDeVenta = detallesDeOrdenDeVentaImp.crearDetallesDeOrdenDeVenta(detallesDeOrdenDeVenta);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoDetallesDeOrdenDeVenta);
    }
	@PutMapping("/editar")
    public ResponseEntity<DetallesDeOrdenDeVenta> editarDetallesDeOrdenDeVenta(@RequestBody DetallesDeOrdenDeVenta detallesDeOrdenDeVenta) {
        DetallesDeOrdenDeVenta detallesDeOrdenDeVentaActualizada = detallesDeOrdenDeVentaImp.editarDetallesDeOrdenDeVenta(detallesDeOrdenDeVenta);
        return ResponseEntity.ok(detallesDeOrdenDeVentaActualizada);
    }

    @DeleteMapping("/eliminar/{idDetallesDeOrdenDeVenta}")
    public ResponseEntity<String> eliminarDetallesDeOrdenDeVenta(@PathVariable Long idDetallesDeOrdenDeVenta) {
        detallesDeOrdenDeVentaImp.eliminarDetallesDeOrdenDeVenta(idDetallesDeOrdenDeVenta);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/traer")
    public ResponseEntity<DetallesDeOrdenDeVenta> traerDetallesDeOrdenDeVenta(@RequestBody DetallesDeOrdenDeVenta detallesDeOrdenDeVenta) {
        DetallesDeOrdenDeVenta detallesDeOrdenDeVentaEncontrada = detallesDeOrdenDeVentaImp.traerDetallesDeOrdenDeVenta(detallesDeOrdenDeVenta);
        return ResponseEntity.ok(detallesDeOrdenDeVentaEncontrada);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<DetallesDeOrdenDeVenta>> listarDetallesDeOrdenDeVenta() {
        List<DetallesDeOrdenDeVenta> listaDetallesDeOrdenDeVenta = detallesDeOrdenDeVentaImp.listarDetallesDeOrdenDeVenta();
        return ResponseEntity.ok(listaDetallesDeOrdenDeVenta);
    }



}
