package com.example.api.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "ORDENES_DE_VENTA")
public class OrdenesDeVenta implements Serializable{

	private static final long serialVersionUID = -4386696953406406490L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orden_venta")
    private Long idOrdenVenta;

    @Column(name = "fecha_de_orden")
    private LocalDate fechaDeOrden;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_cliente", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Cliente cliente;

    
    @OneToMany(mappedBy = "ordenVenta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallesDeOrdenDeVenta> detallesOrdenventas;
	public OrdenesDeVenta() {
		
	}

	public Long getIdOrdenVenta() {
		return idOrdenVenta;
	}

	public void setIdOrdenVenta(Long idOrdenVenta) {
		this.idOrdenVenta = idOrdenVenta;
	}

	public LocalDate getFechaDeOrden() {
		return fechaDeOrden;
	}

	public void setFechaDeOrden(LocalDate fechaDeOrden) {
		this.fechaDeOrden = fechaDeOrden;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	

    
}
