package com.example.api.impl;

import java.util.List;

import com.example.api.models.Usuario;

public interface UsuarioImp {

	public Usuario crearUsuario(Usuario usuario);
	public Usuario editarUsuario(Usuario usuario);
	public String eliminarUsuario(long idUsuario);
	List<Usuario>listarUsuarios();
}
