package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.implementaciones.MarcaImp;
import com.example.api.modelos.Marca;
import com.example.api.repositorys.MarcaRepository;
import com.example.api.repositorys.ModeloRepository;

import jakarta.transaction.Transactional;

@Service
public class MarcaService implements MarcaImp {
	
	@Autowired
	private MarcaRepository marcaRepo;
	@Autowired
	private ModeloRepository modeloRepo;

	@Override
	public Marca crearMarca(Marca marca) {
		return marcaRepo.save(marca);
	}

	@Override
	public Marca editarMarca(Marca marca) {
		Marca marcaExistente = marcaRepo.findById(marca.getIdMarca()).get();
		marcaExistente.setNombreMarca(marca.getNombreMarca());
		return marcaRepo.save(marcaExistente);
	}

	@Override
	@Transactional
	public String eliminarMarca(Long idMarca) {
		marcaRepo.deleteById(idMarca);
		modeloRepo.deleteByMarcaIdMarca(idMarca);
		return "";
	}

	@Override
	public Marca traerMarca(Marca marca) {
		return marcaRepo.findById(marca.getIdMarca()).get();
	}

	@Override
	public List<Marca> traerMarcas() {
		return marcaRepo.findAll();
	}
	
	

}
