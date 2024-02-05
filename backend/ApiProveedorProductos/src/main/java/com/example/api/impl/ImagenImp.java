package com.example.api.impl;

import java.util.List;

import com.example.api.models.Imagen;

public interface ImagenImp {

	public Imagen crearImagen(Imagen imagen);
	public Imagen editarImagen(Imagen imagen);
	public String eliminarImagen(long idImagen);
	List<Imagen>listarImagen();
}
