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
@Table(name = "PROVEEDOR_PRODUCTO")
public class ProveedorProducto implements Serializable{

	private static final long serialVersionUID = -7193269119656993869L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_ProveedorProducto")
	
    private Long idProveedorProducto;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_proveedor", referencedColumnName = "id_proveedor")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Proveedor proveedor;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_producto", referencedColumnName = "id_producto")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Producto producto;
    
    
    

	public ProveedorProducto() {
	
	}

	public Long getIdProveedorProducto() {
		return idProveedorProducto;
	}

	public void setIdProveedorProducto(Long idProveedorProducto) {
		this.idProveedorProducto = idProveedorProducto;
	}

	public Proveedor getProveedor() {
		return proveedor;
	}

	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}
    
    
}
