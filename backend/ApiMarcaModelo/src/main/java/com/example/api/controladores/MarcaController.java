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

import com.example.api.implementaciones.MarcaImp;
import com.example.api.modelos.Marca;

@RestController
@RequestMapping("/marca")
@CrossOrigin("http://localhost:4200")
public class MarcaController {
	
	
	@Autowired
	private MarcaImp marcaImp;
	
	@PostMapping("/crear")
    public ResponseEntity<Marca> crearMarca(@RequestBody Marca marca) {
		Marca nuevaMarca= marcaImp.crearMarca(marca);
		return new ResponseEntity<>(nuevaMarca, HttpStatus.CREATED);
    }
	
	@PutMapping("/editar")
    public ResponseEntity<Marca> editarMarca(@RequestBody Marca marca) {
		Marca nuevaMarca= marcaImp.editarMarca(marca);
		return new ResponseEntity<>(nuevaMarca, HttpStatus.OK);
    }
	@DeleteMapping("/eliminar/{idMarca}")
    public ResponseEntity<String> eliminarMarca(@PathVariable Long idMarca) {
		marcaImp.eliminarMarca(idMarca);
		 return new ResponseEntity<>( HttpStatus.OK);
    }
	@GetMapping("/traer")
	public ResponseEntity<Marca> traerMarca(@RequestBody Marca marca) {
        return ResponseEntity.status(HttpStatus.CREATED).body(marcaImp.traerMarca(marca));
    }
	@GetMapping("/listar")
	public ResponseEntity<List<Marca>>listarMarca(){
		return ResponseEntity.ok(marcaImp.traerMarcas());
	}
}
