package com.example.api.models;

import java.io.Serializable;
import java.time.LocalDate;
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
@Table(name = "VENTA")
public class Venta implements Serializable{


	private static final long serialVersionUID = -8742715554814434223L;
	

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Long idVenta;
    
    @Column(name = "fecha_de_venta")
    private LocalDate fechaDeVenta;
    
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleVenta> detallesventas;

	public Venta() {
		
	}

	public Long getIdVenta() {
		return idVenta;
	}

	public void setIdVenta(Long idVenta) {
		this.idVenta = idVenta;
	}

	public LocalDate getFechaDeVenta() {
		return fechaDeVenta;
	}

	public void setFechaDeVenta(LocalDate fechaDeVenta) {
		this.fechaDeVenta = fechaDeVenta;
	}
    
   
}