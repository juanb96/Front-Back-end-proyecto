package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.models.Comentario;
import com.example.api.repositorys.ComentarioRepository;
@Service
public class ComentarioService implements com.example.api.impl.ComentarioImp{
	@Autowired
	private ComentarioRepository comentarioRepo; 

	@Override
	public Comentario crearComentario(Comentario comentario) {
		return comentarioRepo.save(comentario);
	}

	@Override
	public Comentario editarComentario(Comentario comentario) {
		Comentario comentarioExstente = comentarioRepo.findById(comentario.getIdComentario()).get();
		comentarioExstente.setComentario(comentario.getComentario());
		comentarioExstente.setFechaDeComentario(comentario.getFechaDeComentario());
		return comentarioRepo.save(comentarioExstente);
	}

	@Override
	public String eliminarComentario(long idComentario) {
		boolean existeComentario= comentarioRepo.existsById(idComentario);
		if (existeComentario==true) {
			
			comentarioRepo.deleteById(idComentario);
			return "comentario eliminado";
		} else {
			return  "el id:"+idComentario+" no existe";
		}
	}

	@Override
	public List<Comentario> listarComentarios() { 
		return comentarioRepo.findAll();
	}

}
