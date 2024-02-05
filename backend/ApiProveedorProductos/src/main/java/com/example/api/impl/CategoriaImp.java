package com.example.api.impl;

import java.util.List;

import com.example.api.models.Categoria;

public interface CategoriaImp {
	
	public Categoria crearCategoria(Categoria categoria);
	public Categoria editarCategoria(Categoria categoria, long idCategoria);

	public void eliminarCategoria(long idCategoria);
	List<Categoria>listarCategoria();

}
