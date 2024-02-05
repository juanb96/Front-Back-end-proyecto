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
@Table(name = "CLIENTE")
public class Cliente implements Serializable{
	

	private static final long serialVersionUID = -2838318568173401732L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long idCliente;

    @Column(name = "nombre_cliente", length = 255)
    private String nombreCliente;

    @Column(name = "direccion", length = 255, nullable = true)
    private String direccion;

    @Column(name = "correo_electronico", length = 255, nullable = true)
    private String correoElectronico;

    @Column(name = "numero_de_telefono", length = 20, nullable = true)
    private String numeroDeTelefono;
    
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrdenesDeVenta> ordenesDeVentas;

	public Cliente() {
		
	}

	public Long getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}

	public String getNombreCliente() {
		return nombreCliente;
	}

	public void setNombreCliente(String nombreCliente) {
		this.nombreCliente = nombreCliente;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getCorreoElectronico() {
		return correoElectronico;
	}

	public void setCorreoElectronico(String correoElectronico) {
		this.correoElectronico = correoElectronico;
	}

	public String getNumeroDeTelefono() {
		return numeroDeTelefono;
	}

	public void setNumeroDeTelefono(String numeroDeTelefono) {
		this.numeroDeTelefono = numeroDeTelefono;
	}

   
}
