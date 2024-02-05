package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
