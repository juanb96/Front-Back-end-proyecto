package com.example.api.modelos;
import org.hibernate.annotations.OnDelete;

import java.io.Serializable;

import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "modelo")
public class Modelo implements Serializable{


	private static final long serialVersionUID = 184123942949677349L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_modelo")
    private Long idModelo;

    @Column(name = "nombre_modelo")
    private String nombreModelo;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_marca", referencedColumnName = "id_marca")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Marca marca;

	public Modelo() {
	
	}

	public Long getIdModelo() {
		return idModelo;
	}

	public void setIdModelo(Long idModelo) {
		this.idModelo = idModelo;
	}

	public String getNombreModelo() {
		return nombreModelo;
	}

	public void setNombreModelo(String nombreModelo) {
		this.nombreModelo = nombreModelo;
	}

	public Marca getMarca() {
		return marca;
	}

	public void setMarca(Marca marca) {
		this.marca = marca;
	}

	
	

}
