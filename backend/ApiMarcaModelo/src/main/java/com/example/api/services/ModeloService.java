package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.implementaciones.ModeloImp;
import com.example.api.modelos.Modelo;
import com.example.api.modelos.Modelo;
import com.example.api.repositorys.MarcaRepository;
import com.example.api.repositorys.ModeloRepository;
@Service
public class ModeloService implements ModeloImp{

	@Autowired
	private ModeloRepository modeloRepo;

	@Override
	public Modelo crearModelo(Modelo modelo) {
		return modeloRepo.save(modelo);
	}

	@Override
	public Modelo editarModelo(Modelo modelo) {
		Modelo modeloExistente = modeloRepo.findById(modelo.getIdModelo()).get();
		modeloExistente.setNombreModelo(modelo.getNombreModelo());
		modeloExistente.setMarca(modelo.getMarca());
		return modeloRepo.save(modeloExistente);
	}

	@Override
	public String eliminarModelo(Long idModelo) {
		modeloRepo.deleteById(idModelo);
		return "";
	}

	@Override
	public Modelo traerModelo(Modelo modelo) {
		return modeloRepo.findById(modelo.getIdModelo()).get();
	}

	@Override
	public List<Modelo> traerModelos() {
		return modeloRepo.findAll();
	}
	

}
