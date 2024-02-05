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

import com.example.api.impl.ProveedorImp;
import com.example.api.models.Proveedor;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/proveedores")
public class ProveedorController {

    @Autowired
    private ProveedorImp proveedorImp;

    @PostMapping("/crear")
    public ResponseEntity<Proveedor> crearProveedor(@RequestBody Proveedor proveedor) {
        Proveedor proveedorCreado = proveedorImp.crearProveedor(proveedor);
        return  new ResponseEntity<>(proveedorCreado, HttpStatus.CREATED);
    }

    @PutMapping("/editar/{idProveedor}")
    public ResponseEntity<Proveedor> editarProveedor(@RequestBody Proveedor proveedor, @PathVariable() Long idProveedor) {
        Proveedor proveedorActualizado = proveedorImp.editarProveedor(proveedor,idProveedor);
        return ResponseEntity.ok(proveedorActualizado);
    }

    @DeleteMapping("/eliminar/{idProveedor}")
    public ResponseEntity<String> eliminarProveedor(@PathVariable Long idProveedor) {
        String mensaje = proveedorImp.eliminarProveedor(idProveedor);
        return ResponseEntity.ok(mensaje);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Proveedor>> listarProveedor() {
        List<Proveedor> proveedores = proveedorImp.listarProveedor();
        return  ResponseEntity.ok(proveedores);
    }
}
