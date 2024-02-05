package com.example.api.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "CATEGORIA")
public class Categoria implements Serializable{

	
	private static final long serialVersionUID = 931439217528524803L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_categoria")
    private Long idCategoria;

    @Column(name = "nombre_categoria")
    private String nombreCategoria;
    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Producto> productos;
    
    	

	public Categoria() {
		
	}

	public Long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Long id_categoria) {
		this.idCategoria = id_categoria;
	}

	public String getNombreCategoria() {
		return nombreCategoria;
	}

	public void setNombreCategoria(String nombre_categoria) {
		this.nombreCategoria = nombre_categoria;
	}
   
}
