package com.example.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.CategoriaImp;
import com.example.api.models.Categoria;
import com.example.api.models.Producto;
import com.example.api.repositorys.CategoriaRepository;


@Service
public class CategoriaServices implements CategoriaImp{
	
	@Autowired
	private CategoriaRepository categoriaRepo;

	@Override
	public Categoria crearCategoria(Categoria categoria) {
		return categoriaRepo.save(categoria);
	}

	@Override
	public Categoria editarCategoria(Categoria categoria,long idCategoria) {
		 Categoria categoriaExistente = categoriaRepo.findById(idCategoria).get();
	        categoriaExistente.setNombreCategoria(categoria.getNombreCategoria());
	        return categoriaRepo.save(categoriaExistente);
	}
		
	@Override
	public void eliminarCategoria(long idCategoria) {
		Optional<Categoria> categoriaOptional =categoriaRepo.findById(idCategoria);
		if (categoriaOptional.isPresent()) {
			Categoria categoria=categoriaOptional.get();
			categoriaRepo.delete(categoria);
		}
	}

	@Override
	public List<Categoria> listarCategoria() {
		return categoriaRepo.findAll();
	}

}
