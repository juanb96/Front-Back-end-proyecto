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

import com.example.api.impl.ImagenImp;
import com.example.api.models.Imagen;

@RestController
@RequestMapping("/imagen")
@CrossOrigin("http://localhost:4200")
public class ImagenController {
    
    @Autowired
    private ImagenImp imagenImpl;

    @PostMapping("/crear")
    public ResponseEntity<Imagen> crearImagen(@RequestBody Imagen imagen) {
        Imagen imagenCreada = imagenImpl.crearImagen(imagen);
        return new ResponseEntity<>(imagenCreada, HttpStatus.CREATED);
    }

    @PutMapping("/editar")
    public ResponseEntity<Imagen> editarImagen(@RequestBody Imagen imagen) {
        Imagen imagenEditada = imagenImpl.editarImagen(imagen);
        return ResponseEntity.ok(imagenEditada);
    }

    @DeleteMapping("eliminar/{idImagen}")
    public ResponseEntity<String> eliminarImagen(@PathVariable Long idImagen) {
        imagenImpl.eliminarImagen(idImagen);
        return new  ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Imagen>> listarImagen() {
        List<Imagen> listaImagenes = imagenImpl.listarImagen();
        return ResponseEntity.ok(listaImagenes);
    }
}
