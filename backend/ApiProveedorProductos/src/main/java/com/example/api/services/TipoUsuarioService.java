package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.models.TipoUsuario;
import com.example.api.repositorys.TipoUsuarioRepository;
@Service
public class TipoUsuarioService implements com.example.api.impl.TipoUsuarioImp{

	@Autowired
	private TipoUsuarioRepository tipoUsuarioRepo;
	
	@Override
	public TipoUsuario crearTipoUsuario(TipoUsuario tipoUsuario) {
		return tipoUsuarioRepo.save(tipoUsuario);
	}

	@Override
	public TipoUsuario editarTipoUsuario(TipoUsuario tipoUsuario) {
		TipoUsuario tipoUsuarioExistente= tipoUsuarioRepo.findById(tipoUsuario.getIdTipoUsuario()).get();
		tipoUsuarioExistente.setNombreTipoUsuario(tipoUsuario.getNombreTipoUsuario());
		return tipoUsuarioRepo.save(tipoUsuarioExistente);
	}

	@Override
	public String eliminarTipoUsuario(long idTipoUsuario) {
		boolean tipoUsuarioExiste = tipoUsuarioRepo.existsById(idTipoUsuario);
		if (tipoUsuarioExiste==false) {
			return "el id:"+idTipoUsuario+" no existe";
		} else {
			tipoUsuarioRepo.deleteById(idTipoUsuario);
			return "Tipo Usuario eliminado";
		}
	}

	@Override
	public List<TipoUsuario> listarTipoUsuarios() {
		
		return tipoUsuarioRepo.findAll();
	}

}
