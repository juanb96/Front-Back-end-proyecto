package com.example.api.models;

import java.io.Serializable;

import org.hibernate.annotations.OnDelete;
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
@Table(name = "IMAGEN")
public class Imagen implements Serializable{


	private static final long serialVersionUID = -2291689516370656448L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_imagen")
    private Long idImagen;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "id_producto", referencedColumnName = "id_producto")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Producto producto;

    @Column(name = "url_imagen")
    private String urlImagen;
    
    

	public Imagen() {
		
	}

	public Long getIdImagen() {
		return idImagen;
	}

	public void setIdImagen(Long idImagen) {
		this.idImagen = idImagen;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public String getUrlImagen() {
		return urlImagen;
	}

	public void setUrlImagen(String urlImagen) {
		this.urlImagen = urlImagen;
	}

    
}