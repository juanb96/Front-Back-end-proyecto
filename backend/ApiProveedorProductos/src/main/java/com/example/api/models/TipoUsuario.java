package com.example.api.models;

import java.io.Serializable;
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
@Table(name = "TIPO_USUARIO")
public class TipoUsuario implements Serializable {
	

	private static final long serialVersionUID = 6763098104279233410L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_tipo_usuario")
	private Long idTipoUsuario;
	@Column(name = "nombre_tipo_usuario")
	private String nombreTipoUsuario;
	
	@OneToMany(mappedBy = "tipoUsuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Usuario> usuarios;
	public TipoUsuario() {
		
	}
	public Long getIdTipoUsuario() {
		return idTipoUsuario;
	}
	public void setIdTipoUsuario(Long idTipoUsuario) {
		this.idTipoUsuario = idTipoUsuario;
	}
	public String getNombreTipoUsuario() {
		return nombreTipoUsuario;
	}
	public void setNombreTipoUsuario(String nombreTipoUsuario) {
		this.nombreTipoUsuario = nombreTipoUsuario;
	}
	
	
	
}
