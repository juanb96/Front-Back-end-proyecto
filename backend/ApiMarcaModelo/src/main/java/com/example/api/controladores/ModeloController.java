package com.example.api.controladores;

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

import com.example.api.implementaciones.ModeloImp;
import com.example.api.modelos.Modelo;

@RestController
@RequestMapping("/modelo")
@CrossOrigin("http://localhost:4200")
public class ModeloController {

	
	@Autowired
	private ModeloImp modeloImp;
	
	@PostMapping("/crear")
    public ResponseEntity<Modelo> crearModelo(@RequestBody Modelo modelo) {
		Modelo nuevaModelo= modeloImp.crearModelo(modelo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaModelo);
    }
	
	@PutMapping("/editar")
    public ResponseEntity<Modelo> editarModelo(@RequestBody Modelo modelo) {
		Modelo nuevaModelo= modeloImp.editarModelo(modelo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaModelo);
    }
	@DeleteMapping("/eliminar/{idModelo}")
    public ResponseEntity<String> eliminarModelo(@PathVariable Long idModelo) {
		String mensaje= modeloImp.eliminarModelo(idModelo);
        return ResponseEntity.status(HttpStatus.CREATED).body(mensaje);
    }
	@GetMapping("/traer")
	public ResponseEntity<Modelo> traerModelo(@RequestBody Modelo modelo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(modeloImp.traerModelo(modelo));
    }
	@GetMapping("/listar")
	public ResponseEntity<List<Modelo>>listarModelo(){
		return ResponseEntity.ok(modeloImp.traerModelos());
	}
}
