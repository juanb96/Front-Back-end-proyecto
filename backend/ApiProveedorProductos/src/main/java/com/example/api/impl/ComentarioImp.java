package com.example.api.impl;

import java.util.List;

import com.example.api.models.Comentario;

public interface ComentarioImp {

	
	public Comentario crearComentario(Comentario comentario);
	public Comentario editarComentario(Comentario comentario);
	public String eliminarComentario(long idComentario);
	List<Comentario>listarComentarios();
}
