package com.example.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.models.Usuario;
import com.example.api.repositorys.UsuarioRepository;
@Service
public class UsuarioService implements com.example.api.impl.UsuarioImp{

	@Autowired
    private UsuarioRepository usuarioRepository;

	
	
	@Override
    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }


    

    @Override
    public String eliminarUsuario(long idUsuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(idUsuario);
        if (usuarioExistente.isPresent()) {
            usuarioRepository.deleteById(idUsuario);
            return "Usuario eliminado correctamente.";
        }
        return "No se pudo encontrar el usuario con ID " + idUsuario;
    }

    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }


   

	@Override
	public Usuario editarUsuario(Usuario usuario) {
		 Usuario usuarioExistente = usuarioRepository.findById(usuario.getIdUsuario()).get();
		 usuarioExistente.setNombreUsuario(usuario.getNombreUsuario());
		 usuarioExistente.setCorreoElectronico(usuario.getCorreoElectronico());
		 usuarioExistente.setTipoUsuario(usuario.getTipoUsuario());
		 usuarioExistente.setContrasena(usuario.getContrasena());
		return usuarioRepository.save(usuarioExistente);
	}
}
