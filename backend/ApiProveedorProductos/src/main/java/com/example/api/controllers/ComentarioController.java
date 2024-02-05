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

import com.example.api.impl.ComentarioImp;
import com.example.api.models.Comentario;



@RestController
@RequestMapping("/comentarios")
@CrossOrigin("http://localhost:4200")
public class ComentarioController {
	
	@Autowired
    private ComentarioImp comentarioImpl;

    @PostMapping("/crear")
    public ResponseEntity<Comentario> crearComentario(@RequestBody Comentario comentario) {
        Comentario comentarioCreado = comentarioImpl.crearComentario(comentario);
        return ResponseEntity.status(HttpStatus.CREATED).body(comentarioCreado);
    }

    @PutMapping("/editar")
    public ResponseEntity<Comentario> editarComentario(@RequestBody Comentario comentario) {
        Comentario comentarioEditado = comentarioImpl.editarComentario(comentario);
        return ResponseEntity.ok(comentarioEditado);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarComentario(@PathVariable("id") long idComentario) {
       comentarioImpl.eliminarComentario(idComentario);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Comentario>> listarComentarios() {
        List<Comentario> comentarios = comentarioImpl.listarComentarios();
        return ResponseEntity.ok(comentarios);
    }
}
