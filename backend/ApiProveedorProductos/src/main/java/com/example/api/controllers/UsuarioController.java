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

import com.example.api.impl.UsuarioImp;
import com.example.api.models.Usuario;


@RestController
@RequestMapping("/usuarios")
@CrossOrigin("http://localhost:4200")
public class UsuarioController {
	
	@Autowired
    private UsuarioImp usuarioImpl;

    @PostMapping("/crear")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioImpl.crearUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @PutMapping("/editar")
    public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioActualizado = usuarioImpl.editarUsuario(usuario);
        return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{idUsuario}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable long idUsuario) {
         usuarioImpl.eliminarUsuario(idUsuario);
         return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> listaUsuarios = usuarioImpl.listarUsuarios();
        return new ResponseEntity<>(listaUsuarios, HttpStatus.OK);
    }


}
