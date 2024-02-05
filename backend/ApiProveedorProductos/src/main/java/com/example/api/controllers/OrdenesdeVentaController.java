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

import com.example.api.impl.OrdenesDeVentaImp;
import com.example.api.models.OrdenesDeVenta;

@RestController
@RequestMapping("/ordenesdeventa")
@CrossOrigin("http://localhost:4200")
public class OrdenesdeVentaController {
	
	@Autowired
	private OrdenesDeVentaImp OrdenDeVentaImp;
	
	@PostMapping("/crear")
    public ResponseEntity<OrdenesDeVenta> crearOrdenesDeVenta(@RequestBody OrdenesDeVenta ordenesDeVenta) {
        OrdenesDeVenta nuevaOrdenesDeVenta = OrdenDeVentaImp.crearOrdenesDeVenta(ordenesDeVenta);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOrdenesDeVenta);
    }
	@PutMapping("/editar")
    public ResponseEntity<OrdenesDeVenta> editarOrdenesDeVenta(@RequestBody OrdenesDeVenta ordenesDeVenta) {
        OrdenesDeVenta ordenesDeVentaActualizada = OrdenDeVentaImp.editarOrdenesDeVenta(ordenesDeVenta);
        return ResponseEntity.ok(ordenesDeVentaActualizada);
    }

    @DeleteMapping("/eliminar/{idOrdenesDeVenta}")
    public ResponseEntity<String> eliminarOrdenesDeVenta(@PathVariable Long idOrdenesDeVenta) {
        String mensaje = OrdenDeVentaImp.eliminarOrdenesDeVenta(idOrdenesDeVenta);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/traer")
    public ResponseEntity<OrdenesDeVenta> traerOrdenesDeVenta(@RequestBody OrdenesDeVenta ordenesDeVenta) {
        OrdenesDeVenta ordenesDeVentaEncontrada = OrdenDeVentaImp.traerOrdenesDeVenta(ordenesDeVenta);
        return ResponseEntity.ok(ordenesDeVentaEncontrada);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<OrdenesDeVenta>> listarOrdenesDeVenta() {
        List<OrdenesDeVenta> listaOrdenesDeVenta = OrdenDeVentaImp.listarOrdenesDeVenta();
        return ResponseEntity.ok(listaOrdenesDeVenta);
    }


}
