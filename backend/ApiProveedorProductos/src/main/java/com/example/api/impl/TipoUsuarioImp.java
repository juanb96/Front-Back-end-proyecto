package com.example.api.impl;

import java.util.List;

import com.example.api.models.TipoUsuario;

public interface TipoUsuarioImp {
	
	public TipoUsuario crearTipoUsuario(TipoUsuario tipoUsuario);
	public TipoUsuario editarTipoUsuario(TipoUsuario tipoUsuario);
	public String eliminarTipoUsuario(long idTipoUsuario);
	List<TipoUsuario>listarTipoUsuarios();

}
