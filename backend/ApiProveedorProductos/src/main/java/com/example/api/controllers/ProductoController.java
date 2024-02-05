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

import com.example.api.impl.ProductoImp;
import com.example.api.models.Producto;

@RestController

@RequestMapping("/productos")
@CrossOrigin("http://localhost:4200")
public class ProductoController {
    
    @Autowired
    private ProductoImp productoService;
    
    @PostMapping("/crear")
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.crearProducto(producto);
        return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
    }
    
	    @PutMapping("/editar")
	    public ResponseEntity<Producto> editarProducto(@RequestBody Producto producto) {
	        Producto productoEditado = productoService.editarProducto(producto);
	        return new ResponseEntity<>(productoEditado, HttpStatus.OK);
	    }
    
    @DeleteMapping("/eliminar/{idProducto}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Long idProducto) {
         productoService.eliminarProducto(idProducto);
        return new  ResponseEntity<>( HttpStatus.OK);
    }
    
    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoService.listarProductos();
        return  ResponseEntity.ok(productos);
    }
}
