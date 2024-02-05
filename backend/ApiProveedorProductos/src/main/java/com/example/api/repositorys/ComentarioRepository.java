package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.models.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long>{

}
