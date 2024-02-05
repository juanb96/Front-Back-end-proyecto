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

import com.example.api.impl.DetalleVentaImp;
import com.example.api.models.DetalleVenta;


@RestController
@RequestMapping("/detallesventa")
@CrossOrigin("http://localhost:4200")
public class DetalleVentaController {
	
	
	@Autowired
	private DetalleVentaImp detalleVentaImp;
	
	@PostMapping("/crear")
    public ResponseEntity<DetalleVenta> crearDetalleVenta(@RequestBody DetalleVenta detalleVenta) {
        DetalleVenta nuevoDetalleVenta = detalleVentaImp.crearDetalleVenta(detalleVenta);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoDetalleVenta);
    }
	@PutMapping("/editar")
    public ResponseEntity<DetalleVenta> editarDetalleVenta(@RequestBody DetalleVenta detalleVenta) {
        DetalleVenta detalleVentaActualizada = detalleVentaImp.editarDetalleVenta(detalleVenta);
        return ResponseEntity.ok(detalleVentaActualizada);
    }

    @DeleteMapping("/eliminar/{idDetalleVenta}")
    public ResponseEntity<String> eliminarDetalleVenta(@PathVariable Long idDetalleVenta) {
         detalleVentaImp.eliminarDetalleVenta(idDetalleVenta);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/traer")
    public ResponseEntity<DetalleVenta> traerDetalleVenta(@RequestBody DetalleVenta detalleVenta) {
        DetalleVenta detalleVentaEncontrada = detalleVentaImp.traerDetalleVenta(detalleVenta);
        return ResponseEntity.ok(detalleVentaEncontrada);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<DetalleVenta>> listarDetalleVenta() {
        List<DetalleVenta> listaDetalleVenta = detalleVentaImp.listarDetalleVenta();
        return ResponseEntity.ok(listaDetalleVenta);
    }


}
