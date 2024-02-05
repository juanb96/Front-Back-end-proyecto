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

import com.example.api.impl.ProveedorProductoImp;
import com.example.api.models.ProveedorProducto;

@RestController
@RequestMapping("/proveedor-producto")
@CrossOrigin("http://localhost:4200")
public class ProveedorProductoController {
    
    @Autowired
    private ProveedorProductoImp proveedorProductoService;

    @PostMapping("/crear")
    public ResponseEntity<ProveedorProducto> crearProveedorProducto(@RequestBody ProveedorProducto proveedorProducto) {
        ProveedorProducto nuevoProveedorProducto = proveedorProductoService.crearProveedorProducto(proveedorProducto);
        return new ResponseEntity<>(nuevoProveedorProducto, HttpStatus.CREATED);
    }

    @PutMapping("/editar")
    public ResponseEntity<ProveedorProducto> editarProveedorProducto(@RequestBody ProveedorProducto proveedorProducto) {
        ProveedorProducto proveedorProductoActualizado = proveedorProductoService.editarProveedorProducto(proveedorProducto);
        return ResponseEntity.ok(proveedorProductoActualizado);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarProveedorProducto(@PathVariable("id") long idProveedorProducto) {
        String mensaje = proveedorProductoService.eliminarProveedorProducto(idProveedorProducto);
        return new  ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProveedorProducto>>listarProveedorProducto() {
        List<ProveedorProducto> proveedoresProductos = proveedorProductoService.listarProveedorProducto();
        return ResponseEntity.ok(proveedoresProductos);
    }
}
