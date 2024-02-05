package com.example.api.models;


import java.io.Serializable;
import java.math.BigDecimal;

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
@Table(name = "DETALLE_VENTA")
public class DetalleVenta implements Serializable{


	private static final long serialVersionUID = 6097045480261301180L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_venta")
    private Long idDetalleVenta;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_venta")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Venta venta;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_producto")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Producto producto;
    
    @Column(name = "cantidad")
    private Integer cantidad;
    
    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

	public DetalleVenta() {
		
	}

	public Long getIdDetalleVenta() {
		return idDetalleVenta;
	}

	public void setIdDetalleVenta(Long idDetalleVenta) {
		this.idDetalleVenta = idDetalleVenta;
	}

	public Venta getVenta() {
		return venta;
	}

	public void setVenta(Venta venta) {
		this.venta = venta;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public BigDecimal getPrecioUnitario() {
		return precioUnitario;
	}

	public void setPrecioUnitario(BigDecimal precioUnitario) {
		this.precioUnitario = precioUnitario;
	}
    
    
    
}
    