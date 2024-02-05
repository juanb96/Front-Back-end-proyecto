package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.models.TipoUsuario;

public interface TipoUsuarioRepository extends JpaRepository<TipoUsuario, Long>{

}
