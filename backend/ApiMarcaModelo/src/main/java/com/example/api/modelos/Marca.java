package com.example.api.modelos;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "marca")
public class Marca implements Serializable{

	private static final long serialVersionUID = 6311596995503849465L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_marca")
    private Long idMarca;

    @Column(name = "nombre_marca")
    private String nombreMarca;

	public Marca() {
		
	}

	public Long getIdMarca() {
		return idMarca;
	}

	public void setIdMarca(Long idMarca) {
		this.idMarca = idMarca;
	}

	public String getNombreMarca() {
		return nombreMarca;
	}

	public void setNombreMarca(String nombreMarca) {
		this.nombreMarca = nombreMarca;
	}
    
	
    
}
