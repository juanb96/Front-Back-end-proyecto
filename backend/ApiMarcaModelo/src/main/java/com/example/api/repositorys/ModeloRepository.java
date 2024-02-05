package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.modelos.Modelo;

public interface ModeloRepository extends JpaRepository<Modelo, Long> {

	void deleteByMarcaIdMarca(Long idMarca);
}
