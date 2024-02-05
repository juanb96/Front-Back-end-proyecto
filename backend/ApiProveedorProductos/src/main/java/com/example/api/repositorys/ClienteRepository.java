package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.models.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{

}
