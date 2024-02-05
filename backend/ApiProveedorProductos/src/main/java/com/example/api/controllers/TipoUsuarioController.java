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

import com.example.api.impl.TipoUsuarioImp;
import com.example.api.models.TipoUsuario;


@RestController
@RequestMapping("/tipo-usuarios")
@CrossOrigin("http://localhost:4200")
public class TipoUsuarioController {

	@Autowired
	private TipoUsuarioImp tipoUsuarioImpl;

	@PostMapping("/crear")
	public ResponseEntity<TipoUsuario> crearTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
		TipoUsuario nuevoTipoUsuario = tipoUsuarioImpl.crearTipoUsuario(tipoUsuario);
		return ResponseEntity.ok(nuevoTipoUsuario);
	}

	@PutMapping("/editar")
	public ResponseEntity<TipoUsuario> editarTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
		TipoUsuario tipoUsuarioActualizado = tipoUsuarioImpl.editarTipoUsuario(tipoUsuario);
		return new ResponseEntity<>(tipoUsuarioActualizado, HttpStatus.OK);
	}

	@DeleteMapping("/eliminar/{idTipoUsuario}")
	public ResponseEntity<String> eliminarTipoUsuario(@PathVariable long idTipoUsuario) {
		 tipoUsuarioImpl.eliminarTipoUsuario(idTipoUsuario);
		return new ResponseEntity<>( HttpStatus.OK);
	}

	@GetMapping("/listar")
	public ResponseEntity<List<TipoUsuario>> listarTipoUsuarios() {
		List<TipoUsuario> tipoUsuarios = tipoUsuarioImpl.listarTipoUsuarios();
		return ResponseEntity.ok(tipoUsuarios);
	}
	



}
