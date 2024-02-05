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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;


@Entity
@Table(name = "COMENTARIO")
public class Comentario implements Serializable{

	private static final long serialVersionUID = 1725101796553564827L;
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_comentario")
	private Long idComentario;
	@ManyToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "id_producto")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Producto producto;
	@ManyToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "id_usuario",referencedColumnName = "id_usuario")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Usuario usuario;
	@Column(name = "comentario")
	private String comentario;
	@Column(name = "fecha_de_comentario")
	private Date fechaDeComentario;
	
	
	
	public Comentario() {
		
	}

	public Long getIdComentario() {
		return idComentario;
	}

	public void setIdComentario(Long idComentario) {
		this.idComentario = idComentario;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	
	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Date getFechaDeComentario() {
		return fechaDeComentario;
	}

	public void setFechaDeComentario(Date fechaDeComentario) {
		this.fechaDeComentario = fechaDeComentario;
	}
	
	
	

}
