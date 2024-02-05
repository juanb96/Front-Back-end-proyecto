package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.models.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long>{

}
