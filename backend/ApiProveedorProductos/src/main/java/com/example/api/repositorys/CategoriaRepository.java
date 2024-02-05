package com.example.api.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.api.models.Categoria;


public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

}
