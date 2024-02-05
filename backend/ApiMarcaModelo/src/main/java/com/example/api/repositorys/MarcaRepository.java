package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.modelos.Marca;

public interface MarcaRepository  extends JpaRepository<Marca, Long>{

}
