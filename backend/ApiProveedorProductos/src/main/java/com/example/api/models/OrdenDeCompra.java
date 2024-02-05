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
@Table(name = "orden_de_compra")
public class OrdenDeCompra  implements Serializable{

	private static final long serialVersionUID = -1671788325031273462L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orden_compra")
    private Long idOrdenCompra;

    @Column(name = "fecha_de_orden")
    private LocalDate fechaDeOrden;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "id_proveedor", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Proveedor proveedor;
    @OneToMany(mappedBy = "ordenDeCompra", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompra;
    
	public OrdenDeCompra() {

	}

	public Long getIdOrdenCompra() {
		return idOrdenCompra;
	}

	public void setIdOrdenCompra(Long idOrdenCompra) {
		this.idOrdenCompra = idOrdenCompra;
	}

	public LocalDate getFechaDeOrden() {
		return fechaDeOrden;
	}

	public void setFechaDeOrden(LocalDate fechaDeOrden) {
		this.fechaDeOrden = fechaDeOrden;
	}

	public Proveedor getProveedor() {
		return proveedor;
	}

	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}
	
	

    
}
