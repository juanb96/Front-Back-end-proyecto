package com.example.api.models;

import java.io.Serializable;
import java.sql.Date;

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
@Table(name = "CARRITO_DE_COMPRAS")
public class CarritoDeCompras implements Serializable {

	private static final long serialVersionUID = 5378801675905425146L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_carrito")
	private Long idCarrito;
	@ManyToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "id_usuario")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Usuario usuario;
	@Column(name = "fecha_de_creacion")
	private Date fechaDeCreacion;
	public CarritoDeCompras() {
		
	}
	public Long getIdCarrito() {
		return idCarrito;
	}
	public void setIdCarrito(Long idCarrito) {
		this.idCarrito = idCarrito;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Date getFechaDeCreacion() {
		return fechaDeCreacion;
	}
	public void setFechaDeCreacion(Date fechaDeCreacion) {
		this.fechaDeCreacion = fechaDeCreacion;
	}
	
	
	
	
}
