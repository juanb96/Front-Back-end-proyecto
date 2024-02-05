package com.example.api.impl;

import java.util.List;

import com.example.api.models.ProveedorProducto;
public interface ProveedorProductoImp {
	
	public ProveedorProducto crearProveedorProducto(ProveedorProducto proveedorProducto);
	public ProveedorProducto editarProveedorProducto(ProveedorProducto proveedorProducto);
	public String eliminarProveedorProducto(long idProveedorProducto);
	public List<ProveedorProducto> listarProveedorProducto();

}
