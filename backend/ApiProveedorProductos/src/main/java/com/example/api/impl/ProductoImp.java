package com.example.api.impl;

import java.util.List;

import com.example.api.models.Producto;

public interface ProductoImp {
	
	public Producto crearProducto(Producto producto);
	public Producto editarProducto(Producto producto);
	public String eliminarProducto(long idProducto);
	List<Producto>listarProductos();

}
