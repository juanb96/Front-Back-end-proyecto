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

import com.example.api.impl.ClienteImp;
import com.example.api.models.Cliente;

@RestController
@RequestMapping("/clientes")
@CrossOrigin("http://localhost:4200")
public class ClienteController {

    @Autowired
    private ClienteImp clienteImpl;

    @PostMapping("/crear")
    public ResponseEntity<Cliente> crearCliente(@RequestBody Cliente cliente) {
        Cliente nuevoCliente = clienteImpl.crearCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCliente);
    }

    @PutMapping("/editar")
    public ResponseEntity<Cliente> editarCliente(@RequestBody Cliente cliente) {
        Cliente clienteActualizado = clienteImpl.editarCliente(cliente);
        return ResponseEntity.ok(clienteActualizado);
    }

    @DeleteMapping("/eliminar/{idCliente}")
    public ResponseEntity<String> eliminarCliente(@PathVariable Long idCliente) {
        clienteImpl.eliminarCliente(idCliente);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/traer")
    public ResponseEntity<Cliente> traerCliente(@RequestBody Cliente cliente) {
        Cliente clienteEncontrado = clienteImpl.traerCliente(cliente);
            return ResponseEntity.ok(clienteEncontrado);
     
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Cliente>> listarClientes() {
        List<Cliente> listaClientes = clienteImpl.listarClientes();
        return ResponseEntity.ok(listaClientes);
    }
}
