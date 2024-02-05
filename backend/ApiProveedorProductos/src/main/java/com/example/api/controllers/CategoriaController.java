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

import com.example.api.impl.CategoriaImp;
import com.example.api.models.Categoria;

@RestController
@RequestMapping("/categoria")
@CrossOrigin("http://localhost:4200")
public class CategoriaController {

    @Autowired
    private CategoriaImp categoriaImp;

    @PostMapping("/crear")
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        Categoria categoriaCreada = categoriaImp.crearCategoria(categoria);
        return new ResponseEntity<>(categoriaCreada, HttpStatus.CREATED);
    }

    @PutMapping("/editar/{idCategoria}")
    public ResponseEntity<Categoria> editarCategoria( @RequestBody Categoria categoria, @PathVariable() Long idCategoria) {
        Categoria categoriaEditada = categoriaImp.editarCategoria(categoria,idCategoria);
        return new ResponseEntity<>(categoriaEditada, HttpStatus.OK);
    }




    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable("id") Long idCategoria) {
        categoriaImp.eliminarCategoria(idCategoria);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaImp.listarCategoria();
        return new ResponseEntity<>(categorias, HttpStatus.OK);
    }
}


